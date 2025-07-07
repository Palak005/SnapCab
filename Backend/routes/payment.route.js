import express from "express";
import {createOrder, verifyPayment} from "../controllers/payment.controller.js" 

const router = express.Router();


router.post("/verifyPayment", verifyPayment);
router.post("/createOrder", createOrder);

export default router;