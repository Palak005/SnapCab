import { Router } from "express";
import Ride from "../models/ride.model.js"
import rideController from "../controllers/ride.controller.js";
import authUser from "../utils/authUser.js";
import { captainInRadius } from "../services/map.services.js";

const router = Router();

router.get("/getRide", authUser,  rideController.getRide);
router.post("/create", authUser, rideController.createRide);                               
router.get("/liveRide", rideController.getLiveRide);
router.get("/completedRide", authUser, rideController.getCompletedRide);
router.get("/:id/start", rideController.startRide);
router.get("/:id/cancel", rideController.cancelRide);
router.post("/:id/accept", rideController.acceptRide);
router.get("/:id", rideController.getIndi);

export default router;