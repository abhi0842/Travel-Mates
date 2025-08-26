import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes (always relative to this folder)
import travelerRoutes from "./routes/travelers.js";
import destinationRoutes from "./routes/destinations.js";
import experienceRoutes from "./routes/Experience.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/travelers", travelerRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/experiences", experienceRoutes);

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
