import { useEffect, useState } from "react";
import RideCard from "../../components/RideCard";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";

const AvailableRide = ()=>{  
    const [rides, setRides] = useState([]);
    const {socket} = SocketContext();

    useEffect(()=>{
        try{
            //Fetching Available Ride Data
            const calling = async()=>{
                const response = await axios.get("/api/ride/liveRide");
                const data = response.data;
                setRides(data.rides);
                console.log(data);
            }

            calling();

            //Updating Available Rides, whenever user cancels or creates ride
            socket.on("rideCreated", ()=>{
                calling();
            });

            socket.on("ride-cancelled", ({ride})=>{
                calling();
            })
        }catch(error){
            console.log(error.message);
        }
    }, [socket]);

    return (
        <div className="h-screen w-screen p-12">
            {rides.map((ride)=>(
                <RideCard key={ride._id} ride={ride}/>
            ))}
        </div>
    )
}

export default AvailableRide;