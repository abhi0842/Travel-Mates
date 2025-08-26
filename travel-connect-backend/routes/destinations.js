import express from "express";
import {
  getDestinations,
  createDestination,
} from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getDestinations);
router.post("/", createDestination);

export default router;
