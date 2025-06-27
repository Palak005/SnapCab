import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authUser = async(req, res, next)=>{
    try{
        const {userToken} = req.cookies;
        if(!userToken){
            return res.status(400).json({
                message : "userToken Doesn't exist"
            });
        }

        //Verifying the userToken
        const decode = jwt.verify(userToken, process.env.SECRET_KEY);

        //Finding the corresponding user;
        const user = await User.findById(decode.userId).select("-password");

        if(!user){
            return res.status(400).json({
                message : "Invalid userToken As User Doesn't exist"
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