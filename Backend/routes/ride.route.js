import { Router } from "express";
import Ride from "../models/ride.model.js"
import rideController from "../controllers/ride.controller.js";
import authUser from "../utils/authUser.js";

const router = Router();

router.get("/getRide", authUser,  rideController.getRide);
router.post("/create", authUser, rideController.createRide);
router.get("/liveRide", rideController.getLiveRide);
router.post("/cancel/:id", rideController.cancelRide);
router.get("/:id", rideController.getIndi);

export default router;