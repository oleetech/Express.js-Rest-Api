const postRoute = require("express").Router();

const verifyToken = require("../middleware/tokenverify");
const Post = require("../models/postmodels");
const User = require("../models/userModels");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Create an 'uploads' directory in your project
    },
    filename: (req, file, cb) => {
      const fileName = 'post_' + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage });

postRoute.post('/', verifyToken, upload.single('photo'),async (req, res) => {
    try {
        const { title, content, category } = req.body;
        const photo = req.file ? req.file.filename : undefined;

        const userId = req.userId;

        let username = "admin";  // Default username in case user is not found

        if (userId) {
            // If userId is available, try to get the username from the user
            const user = await User.findById(userId);
            if (user) {
                username = user.username;
            }
        }

        const newPost = new Post({ title, content, username, category,photo  });
        await newPost.save();
        res.status(201).json({ message: "Post Created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get All Post
postRoute.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get Single Post

postRoute.get("/:id", async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update A Post
postRoute.put("/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content, category } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { title, content, category },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Delete A Post
postRoute.delete("/:id", verifyToken, async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = postRoute;