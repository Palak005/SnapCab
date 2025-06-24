import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import userRouter from "./routes/user.route.js";
import captainRouter from "./routes/captain.route.js";
import rideRouter from "./routes/ride.route.js";
import mapRouter from "./routes/map.route.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.get("/dis", async(req, res)=>{
    const source = "";
    const target = "";
    const response = await axios.get("https://apis.mappls.com/advancedmaps/v2/distance", {
        params : {
            source,
            target,
            costing : "auto",
            speedTypes : "predictive"
        }
    });

    res.json(response);
})

app.use("/user", userRouter);
app.use("/captain", captainRouter);
app.use("/map", mapRouter);
app.use("/ride", rideRouter);

export default app;