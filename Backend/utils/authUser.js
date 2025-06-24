import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";

const authUser = async(req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            return res.status(400).json({
                message : "Token Doesn't exist"
            });
        }

        //Verifying the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        //Finding the corresponding user;
        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(400).json({
                message : "Invalid Token As User Doesn't exist"
            });
        }
        req.user = user;

        next();

    } catch(error){
        console.log("Error while Authenticating", error.message);
        res.status(400).json({
            error : error.message
        });
    }
}

export default authUser;