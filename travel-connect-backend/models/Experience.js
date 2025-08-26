import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  destination: { type: String, required: true },
  country: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Experience", experienceSchema);
