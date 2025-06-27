import { getFare } from "../services/ride.services.js";
import Ride from "../models/ride.model.js";
import { calculateDistance } from "../services/map.services.js";


const getRide = async(req, res)=>{
    try{
        const user = req.user;
        const rides = await Ride.find({user : user._id});
        res.status(201).json({rides});
    }catch(error){
        res.status(400).json({error : error.message});
    }
}

const getLiveRide = async(req, res)=>{
    try{
        const rides = await Ride.find({status : "pending" });
        res.status(201).json({rides});
    }catch(error){
        res.status(400).json({error : error.message});
    }
}

const getIndi = async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id);

        const ride = await Ride.findById(id);
        if(!ride){
            res.status(400).json({message : "Ride do not exist"});
        }

        res.status(201).json({message : "Ride Found", ride});
    }catch(error){
        console.log(error.message);
        res.status(400).json({error : error.message});
    }
}

const createRide =  async(req, res)=>{
    try{        
        const {pickup, destination, vehicleType} = req.body;
        
        const user = "684bf31fce4024f03c52ed4f";

        if(!pickup || !destination || !vehicleType){
            return res.status(400).json({message : "All fields are required"});
        }

        const distance = await calculateDistance({pickup, destination});
        const fare = getFare({distance, vehicleType});

        const newRide = await Ride.create({
            user, 
            pickup,
            destination,
            distance,
            fare,
            vehicleType
        });

        if(!newRide){
            return res.status(400).json({ message : "Ride creation failed." });
        }

        return res.status(201).json({ message : "Ride Created Successfully",  ride: newRide });

    }catch(error){
        console.log(error.message);
        return res.status(400).json({ message : error.message});
    }
}

const cancelRide = async(req, res)=>{
    try{
        const {id} = req.params;
        console.log(id);

        const ride = await Ride.findByIdAndDelete(id);
        if(!ride){
            res.status(400).json({message : "Ride does not exist"});
        }

        res.status(201).json({message : "Ride Cancelled Successfully", ride});
    }catch(error){
        console.log(error.message);
        res.status(400).json({message : error.message});
    }
};



export default {createRide, getRide, cancelRide, getIndi, getLiveRide};
