import express from "express"
import {
  getExperiences,
  createExperience,
} from "../controllers/experienceController.js"

const router = express.Router()

// GET all experiences
router.get("/", getExperiences)

// POST new experience
router.post("/", createExperience)

export default router
