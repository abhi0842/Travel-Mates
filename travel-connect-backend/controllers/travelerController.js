import Traveler from "../models/Traveler.js";

export const getTravelers = async (req, res) => {
  try {
    const travelers = await Traveler.find();
    res.json(travelers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTraveler = async (req, res) => {
  try {
    const traveler = new Traveler(req.body);
    const saved = await traveler.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
