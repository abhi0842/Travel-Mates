import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import searchRoute from "./routes/search.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";
 
dotenv.config();


const PORT = process.env.PORT || 5173;

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS configuration – allow the frontend URL configured in env plus
// default localhost origins for development.
const allowedOrigins = [
    process.env.URL,
    "http://localhost:5173",    // vite dev server
    "http://localhost:8000"     // occasionally backend may serve pages
].filter(Boolean);
const corsOptions = {
    origin: allowedOrigins,
    credentials: true
};
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/search", searchRoute);

// serve built frontend only in production (or when dist exists)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});