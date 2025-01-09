const express = require("express");
const register = require("./register");
const login = require("./login");
const router = express.Router();
// routes/postRoutes.js
const { upload, createPost , updatePost} = require("../controllers/post");

// Route to create a post with an image
router.post("/create", upload.single("image"), createPost);


module.exports = router;

const verifyUser = require("./verifyUser");  // Middleware to verify if the user is logged in
router.put("/post/:id", verifyUser, upload.single("fileUpload"), updatePost);
// Add Post
router.put("/post/:id", verifyUser, upload.single("fileUpload"), async (req, res) => {
    const postId = req.params.id;
    const { content } = req.body;

    // Prepare the data to be updated
    const updateData = { content };
    if (req.file) {
        updateData.image = req.file.filename; // Only include image if a new file is uploaded
    }

    try {
        const post = await Post.findByPk(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await post.update(updateData); // Update post directly
        res.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error.message); // Log the error message for debugging
        res.status(500).json({ error: "Failed to update post", details: error.message });
    }
});


// Update Post
router.put("/post/:id", verifyUser, (req, res) => {
    const postId = req.params.id;
    const { content, image_url } = req.body;
    db.query("UPDATE posts SET content = ?, image_url = ? WHERE id = ? AND user_id = ?", 
        [content, image_url, postId, req.user.id], (err, result) => {
            if (err) return res.status(500).json({ error: "Error updating post" });
            if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
            res.json({ success: "Post updated successfully" });
        }
    );
});

// Delete Post
router.delete("/posts/:id", verifyUser, (req, res) => {
    const postId = req.params.id;
    db.query("DELETE FROM posts WHERE id = ? AND user_id = ?", [postId, req.user.id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting post" });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
        res.json({ success: "Post deleted successfully" });
    });
});



const getPosts = require("./getPosts");

router.get("/post", getPosts);

// Corrected routes
router.post("/register", register);
router.post("/login", login);
// Uncomment if you want to use the logout route

module.exports = router;