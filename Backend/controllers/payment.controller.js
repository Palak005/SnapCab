import { createRazorpayInstance } from "../config/razorpay.config.js";
import crypto from "crypto";

const razorPayInstance = createRazorpayInstance();

export const createOrder = async(req, res)=>{
    //Do not consider the fare from frontend
    const {rideId, fare} = req.body;

    //fetching ride data from backend 


    //create an order
    const options = {
        amount: 100*100, //amount in smallest currency unit
        currency: "INR",
        receipt: "receipt_order_1"
    };

    try{
        razorPayInstance.orders.create(options, (err, order)=>{
            if(err){
                return res.status(500).json({
                    success : false,
                    message: "Something went wrong",
                })
            }
            return res.status(200).json(order);
        })
    } catch(error){
        return res.status(500).json({
            success : false,
            message: "Something went wrong"
        })
    }
}

export const verifyPayment = async(req, res)=>{
    const {order_id, payment_id, signature} = req.body;
    console.log(order_id, payment_id, signature);

    const secret = process.env.RAZORPAY_KEY_SECRET;

    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    if(generatedSignature === signature){
        return res.status(200).json({
            success : true,
            message : "Payment Verified",
        });
    }else{
        return res.status(400).json({
            success : false,
            message: "Payment not verified",
        })
    }
};