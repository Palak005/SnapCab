import { useState } from "react";
import axios from "axios";
import RideCard from "../../components/RideCard";
import { CaptainContext } from "../../context/CaptainContext";
import { useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { Socket } from "socket.io-client";

const CaptainHome = ()=>{
    const [rides, setRides] = useState([]);
    const [captain, setCaptain] = CaptainContext();
    const { sendMessage, recieveMessage } = SocketContext();

    useEffect(()=>{
        sendMessage("join", {id : captain._id, type : "captain"});
    }, [captain]);

    useEffect(()=>{
        try{
            const calling = async()=>{
                const response = await axios.get("/api/ride/liveRide");
                const data = response.data;

                // console.log(data.rides);
                setRides(data.rides);
            }

            calling();
        }catch(error){
            console.log(error.message);
        }
    }, []);

    return (
        <div className="h-screen w-screen">
            {rides.map((ride)=>(
                <RideCard key={ride._id} ride={ride}/>
            ))}
        </div>
    )
}

export default CaptainHome;