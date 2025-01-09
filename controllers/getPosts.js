const db = require("../routes/db-config");

const getPosts = (req, res) => {
    db.query("SELECT posts.content, posts.image_url, users.uname FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC", 
    (err, results) => {
        if (err) return res.status(500).json({ error: "Error retrieving posts" });
        res.json(results);
    });
};

    module.exports = getPosts;
