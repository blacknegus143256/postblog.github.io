// routes/postRoutes.js

const express = require("express");
const { upload, createPost, getAllPosts, getUserPosts, updatePost, deletePost, getFullPost } = require("../controllers/post");
const router = express.Router();

// Route to create a post with file upload
router.post("/", upload.single("fileUpload"), createPost);
// Route to get all posts for homepage
router.get("/", getAllPosts);

// Get user's posts
router.get("/user/posts", getUserPosts);

// Update post
router.put("/:id", updatePost);

// Delete post
router.delete("/:id", deletePost);
router.get("/:id", getFullPost);
module.exports = router;
