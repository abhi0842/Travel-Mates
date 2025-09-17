import express from "express";
import Travel from '../models/Travel.js';
import Traveler from '../models/Traveler.js';


const router = express.Router();

// Get all travelers
router.get("/", async (req, res) => {
  try {
    const travelers = await Traveler.find();
    res.json(travelers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new traveler
router.post("/", async (req, res) => {
  const traveler = new Traveler(req.body);
  try {
    const savedTraveler = await traveler.save();
    res.status(201).json(savedTraveler);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE traveler and all associated travels
router.delete("/:id", async (req, res) => {
  try {
    const travelerId = req.params.id;

    // Check if traveler exists
    const traveler = await Traveler.findById(travelerId);
    if (!traveler) {
      return res.status(404).json({ message: "Traveler not found" });
    }

    // Delete all travels associated with this traveler
    await Travel.deleteMany({ travelerId });

    // Delete the traveler
    await Traveler.findByIdAndDelete(travelerId);

    res.json({ message: "Traveler and their travels deleted successfully" });
  } catch (err) {
    console.error("Error deleting traveler and travels:", err);
    res.status(500).json({ message: err.message });
  }
});

// Follow a traveler
router.post('/:id/follow', async (req, res) => {
  const targetTravelerId = req.params.id;
  const { userId } = req.body; // ID of the user who sends the follow request

  if (userId === targetTravelerId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const targetTraveler = await Traveler.findById(targetTravelerId);
    const user = await Traveler.findById(userId);

    if (!targetTraveler || !user) {
      return res.status(404).json({ message: "Traveler not found." });
    }

    if (!targetTraveler.followers.includes(userId)) {
      targetTraveler.followers.push(userId);
      user.following.push(targetTravelerId);

      await targetTraveler.save();
      await user.save();
    }

    res.json({ message: 'Followed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unfollow a traveler
router.post('/:id/unfollow', async (req, res) => {
  const targetTravelerId = req.params.id;
  const { userId } = req.body;

  if (userId === targetTravelerId) {
    return res.status(400).json({ message: "You cannot unfollow yourself." });
  }

  try {
    const targetTraveler = await Traveler.findById(targetTravelerId);
    const user = await Traveler.findById(userId);

    if (!targetTraveler || !user) {
      return res.status(404).json({ message: "Traveler not found." });
    }

    targetTraveler.followers = targetTraveler.followers.filter(fId => fId.toString() !== userId);
    user.following = user.following.filter(fId => fId.toString() !== targetTravelerId);

    await targetTraveler.save();
    await user.save();

    res.json({ message: 'Unfollowed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
