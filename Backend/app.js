import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import rideRouter from "./routes/ride.route.js";
import mapRouter from "./routes/map.route.js"
import paymentRouter from "./routes/payment.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/location", (req, res)=>{
    console.log(navigator.geolocation);
    // const location = navigator.geolocation.getCurrentPosition(success, error, options)
    res.send("Fetching live location");
})

app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);
app.use("/payment", paymentRouter);

export default app;