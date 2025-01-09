const db = require("../routes/db-config");
// controllers/post.js

const multer = require('multer');
const path = require('path');

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create a post
const createPost = (req, res) => {
    const { content } = req.body;
    const image = req.file ? req.file.filename : null;
    const userId = req.user.id;

    const sql = "INSERT INTO posts (user_id, content, fileUpload) VALUES (?, ?, ?)";
    db.query(sql, [userId, content, image], (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the actual error
            return res.status(500).json({ error: "Error creating post." });
        }
        res.status(200).json({ message: "Post created successfully!" });
    });
};

// Export the upload middleware and createPost function
module.exports = {
    upload,
    createPost
};

// Get user's posts
const getUserPosts = (req, res) => {
    const userId = req.user.id; // assuming `req.user` contains logged-in user's info
    const sql = "SELECT * FROM posts WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
      if (err) return res.status(500).json({ error: "Error retrieving posts" });
      res.json(results);
    });
};
// Get all posts (for the homepage)
const getAllPosts = (req, res) => {
    db.query("SELECT posts.*, users.username AS uname FROM posts JOIN users ON posts.user_id = users.id", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving posts" });
        }
        res.json(results);
    });
};

// Update a post
const updatePost = (req, res) => {
    const { content } = req.body; // Ensure this is set
    const postId = req.params.id;

    if (!content) {
        return res.status(400).json({ error: "Content cannot be null or empty." });
    }

    // Check if an image file is uploaded
    let sql, params;
    if (req.file) {
        const image = req.file.filename;
        sql = "UPDATE posts SET content = ?, fileUpload = ? WHERE id = ?";
        params = [content, image, postId];
    } else {
        sql = "UPDATE posts SET content = ? WHERE id = ?";
        params = [content, postId];
    }

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error("Error updating post:", err.message);
            return res.status(500).json({ error: "Error updating post." });
        }
        res.status(200).json({ message: "Post updated successfully!" });
    });
    console.log(req.body); // This will help you check if content is present

};




// Delete a post
const deletePost = (req, res) => {
    const postId = req.params.id;
    db.query("DELETE FROM posts WHERE id = ?", [postId], (err, result) => {
        if (err) return res.status(500).send("Error deleting post.");
        res.status(200).json({ message: "Post deleted successfully!" });
    });
};
const getFullPost = (req, res) => {
    const postId = req.params.id;
    db.query("SELECT * FROM posts WHERE id = ?", [postId], (err, results) => {
        if (err || results.length === 0) return res.status(404).send("Post not found.");
        res.render("post", { post: results[0] }); // Render the post.ejs with the post data
    });
};
module.exports = {
    upload,
    createPost,
    getUserPosts,
    getAllPosts, 
    updatePost,
    deletePost,
    getFullPost
};
