import express from "express"
import Traveler from "../models/Traveler.js"

const router = express.Router()

// Get all travelers
router.get("/", async (req, res) => {
  try {
    const travelers = await Traveler.find()
    res.json(travelers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create new traveler
router.post("/", async (req, res) => {
  const traveler = new Traveler(req.body)
  try {
    const savedTraveler = await traveler.save()
    res.status(201).json(savedTraveler)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
