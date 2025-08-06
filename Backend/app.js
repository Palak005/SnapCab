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
import authUser from "./utils/authUser.js";

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  // 'https://snapcab-frontend.onrender.com'
];

app.use(cors({
  origin: "https://snapcab-frontend.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/location", authUser, (req, res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})

app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);
app.use("/payment", paymentRouter);

export default app;