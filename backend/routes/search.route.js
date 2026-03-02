import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { searchUsers, searchPosts, getExplorePosts } from "../controllers/search.controller.js";
import { Post } from "../models/post.model.js";

const router = express.Router();

// Search routes
router.get("/users", isAuthenticated, searchUsers);
router.get("/posts", isAuthenticated, searchPosts);
router.get("/explore", isAuthenticated, getExplorePosts);

// Debug route - check if posts exist in database
router.get("/debug/posts-count", isAuthenticated, async (req, res) => {
    try {
        const count = await Post.countDocuments();
        const posts = await Post.find().limit(3);
        
        console.log("[DEBUG] Total posts in DB:", count);
        console.log("[DEBUG] Sample posts:", posts);
        
        res.json({
            success: true,
            message: "Debug info",
            totalPosts: count,
            samplePosts: posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Debug error",
            error: error.message,
        });
    }
});

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Search routes are working", success: true });
});

export default router;
