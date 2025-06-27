import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import rideRouter from "./routes/ride.route.js";
import mapRouter from "./routes/map.route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);

export default app;