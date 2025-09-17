import Destination from "../models/Destination.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Renamed from createDestination to addDestination for consistency
export const addDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const saved = await destination.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Destination.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
