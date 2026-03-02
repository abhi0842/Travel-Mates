import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        searchQuery: {
            type: String,
            required: true,
        },
        searchType: {
            type: String,
            enum: ["user", "post", "hashtag"],
            default: "user",
        },
        results: [
            {
                resultId: mongoose.Schema.Types.ObjectId,
                resultType: String,
                resultData: mongoose.Schema.Types.Mixed,
            },
        ],
    },
    { timestamps: true }
);

export const Search = mongoose.model("Search", searchSchema);
