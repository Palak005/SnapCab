import { getFare } from "../services/ride.services.js";
import Ride from "../models/ride.model.js";
import { calculateDistance, captainInRadius } from "../services/map.services.js";
import { broadCastRide, io } from "../server.js";
import Captain from "../models/captain.model.js";


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
        const rides = await Ride.find({status : "pending" }).sort({ createdAt : -1}).limit(10).populate("user");
        console.log(rides);
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
        
        const user = req.user._id;

        if(!pickup || !destination || !vehicleType){
            return res.status(400).json({message : "All fields are required"});
        }

        const data = await calculateDistance({pickup, destination});
        const distance = data.distance;
        const pickupCoord = data.coord;

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

        //Finding all the captains within 2km distance from pickup point
        const captains = await captainInRadius({lat : pickupCoord.lat, long : pickupCoord.long, radius : 15});
        // console.log("broadcasting to ", {lat : pickupCoord.lat, long : pickupCoord.long, radius : 3}, captains);

        broadCastRide({captains, ride:newRide});
        
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

        //updating the captains too
        io.emit("ride-cancelled", {ride});
        res.status(201).json({message : "Ride Cancelled Successfully", ride});
    }catch(error){
        console.log(error.message);
        res.status(400).json({message : error.message});
    }
};

const acceptRide = async(req, res)=>{
    try{
        console.log("accepting request");
        const {id : rideId} = req.params;
        const {captainId} = req.body;

        if(!rideId){
            return res.status(400).json({message : "Ride Id Not Passed"});
        }

        if(!captainId){
            return res.status(400).json({message : "Captain Id is required"});
        }

        const ride = await Ride.findByIdAndUpdate(rideId, {captain : captainId, status : 'accepted'}, {new : true}).populate("user").populate("captain");

        if(!ride){
            return res.status(400).json({message : "No such ride exists"});
        }

        //Notifying the user that ride is accepted 
        const userSocketId = ride.user?.socketId;
        if(userSocketId){
            console.log("emitting accept signal" )
            io.to(userSocketId).emit("ride-accepted", {
                message : "Ride Accepted",
                ride,
            })
        }
        console.log(ride);

        res.status(200).json({
            message : "Ride Accepted Successfully",
            ride
        });
    }catch(error){
        res.status(400).send({message : error.message});
    }
}



export default {createRide, getRide, cancelRide, getIndi, getLiveRide, acceptRide};
