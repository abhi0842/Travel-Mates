import Destination from "../models/Destination.js";

export const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDestination = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    const saved = await destination.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
