import express from "express";
import { deleteDestination, getDestinations, addDestination } from "../controllers/destinationController.js";

const router = express.Router();

router.get("/", getDestinations);
router.post("/", addDestination);
router.delete("/:id", deleteDestination);

export default router;
