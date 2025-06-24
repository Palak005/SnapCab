import { getFare } from "../services/ride.services.js";
import Ride from "../models/ride.model.js";

const createRide =  async(req, res)=>{
    try{        
        const {pickup, destination, vehicleType} = req.body;
        
        const user = "684bf31fce4024f03c52ed4f";

        if(!pickup || !destination || !vehicleType){
            return res.status(400).json({error : "All fields are required"});
        }

        const fare = getFare(pickup, destination, vehicleType);

        const newRide = await Ride.create({
            user, 
            pickup,
            destination,
            fare
        });

        if(!newRide){
            return res.status(400).json({ error : "Ride creation failed." });
        }

        return res.status(201).json({ ride: newRide });

    }catch(error){
        console.log(error.message);
        return res.status(400).json({ error: error.message || "Invalid input data." });
    }
}


export default {createRide};
