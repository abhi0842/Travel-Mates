import mongoose from "mongoose";

const travelerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: String,
  phone: String,
  email: String,
  country: String,
  sex: { type: String, enum: ["Male", "Female", "Other"] },
});

export default mongoose.model("Traveler", travelerSchema);
