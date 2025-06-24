import jwt from "jsonwebcaptainToken";
import {Captain} from "../models/captain.model.js";

const authCaptain = async(req, res, next)=>{
    try{
        const {captainToken} = req.cookies;
        if(!captainToken){
            return res.status(400).json({
                message : "captainToken Doesn't exist"
            });
        }

        //Verifying the captainToken
        const decode = jwt.verify(captainToken, process.env.JWT_SECRET);

        //Finding the corresponding captain;
        const captain = await Captain.findById(decode.captainId).select("-password");

        if(!captain){
            return res.status(400).json({
                message : "Invalid captainToken As captain Doesn't exist"
            });
        }
        req.captain = captain;

        next();

    } catch(error){
        console.log("Error while Authenticating", error.message);
        res.status(400).json({
            error : error.message
        });
    }
}

export default authCaptain;