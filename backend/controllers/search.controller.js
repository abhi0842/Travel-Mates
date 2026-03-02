import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

export const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        
        console.log("[SEARCH USERS] Query:", query);

        if (!query || query.trim().length === 0) {
            return res.status(400).json({
                message: "Search query is required",
                success: false,
            });
        }

        // Search users by username or bio
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: "i" } },
                { bio: { $regex: query, $options: "i" } },
            ],
        })
            .select("-password")
            .lean();

        console.log("[SEARCH USERS] Found:", users.length, "users");

        if (!users || users.length === 0) {
            return res.status(200).json({
                message: "No users found",
                users: [],
                success: true,
            });
        }

        return res.status(200).json({
            message: "Users found successfully",
            users,
            success: true,
        });
    } catch (error) {
        console.error("[SEARCH USERS ERROR]", error);
        return res.status(500).json({
            message: "Error searching users",
            success: false,
            error: error.message,
        });
    }
};

export const searchPosts = async (req, res) => {
    try {
        const { query } = req.query;
        
        console.log("[SEARCH POSTS] Query:", query);

        if (!query || query.trim().length === 0) {
            return res.status(400).json({
                message: "Search query is required",
                success: false,
            });
        }

        // Search posts by caption
        const posts = await Post.find({
            caption: { $regex: query, $options: "i" },
        })
            .populate({ path: "author", select: "username profilePicture" })
            .populate({ path: "comments" })
            .sort({ createdAt: -1 })
            .lean();

        console.log("[SEARCH POSTS] Found:", posts.length, "posts");

        if (!posts || posts.length === 0) {
            return res.status(200).json({
                message: "No posts found",
                posts: [],
                success: true,
            });
        }

        return res.status(200).json({
            message: "Posts found successfully",
            posts,
            success: true,
        });
    } catch (error) {
        console.error("[SEARCH POSTS ERROR]", error);
        return res.status(500).json({
            message: "Error searching posts",
            success: false,
            error: error.message,
        });
    }
};

export const getExplorePosts = async (req, res) => {
    try {
        console.log("[EXPLORE] Fetching all posts");

        const explorePost = await Post.find()
            .sort({ createdAt: -1 })
            .populate({ path: "author", select: "username profilePicture" })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: {
                    path: "author",
                    select: "username profilePicture"
                }
            });

        console.log("[EXPLORE] Found:", explorePost.length, "posts");
        console.log("[EXPLORE] First post:", explorePost[0]);

        if (!explorePost || explorePost.length === 0) {
            return res.status(200).json({
                message: "No posts found",
                posts: [],
                success: true,
            });
        }

        return res.status(200).json({
            message: "Explore posts fetched successfully",
            posts: explorePost,
            success: true,
        });
    } catch (error) {
        console.error("[EXPLORE ERROR]", error);
        return res.status(500).json({
            message: "Error fetching explore posts",
            success: false,
            error: error.message,
        });
    }
};
