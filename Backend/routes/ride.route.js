import { Router } from "express";
import Ride from "../models/ride.model.js"
import rideController from "../controllers/ride.controller.js";

const router = Router();
router.post("/create", rideController.createRide);

export default router;