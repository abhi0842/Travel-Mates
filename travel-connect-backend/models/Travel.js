import mongoose from 'mongoose';

const travelSchema = new mongoose.Schema({
  travelerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Traveler', required: true },
  destination: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  notes: String,
  // add other travel-related fields as needed
});

const Travel = mongoose.model('Travel', travelSchema);

export default Travel;
