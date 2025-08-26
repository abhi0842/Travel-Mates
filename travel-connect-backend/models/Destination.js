import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  image: String,
});

export default mongoose.model("Destination", destinationSchema);
