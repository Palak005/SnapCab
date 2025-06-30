import { useState } from "react";
import axios from "axios";
import RideCard from "../../components/RideCard";
import { CaptainContext } from "../../context/CaptainContext";
import { useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import toast from "react-hot-toast";

const CaptainHome = ()=>{
    const [rides, setRides] = useState([]);
    const [captain, setCaptain] = CaptainContext();
    const { socket } = SocketContext();

    useEffect(()=>{
        let updateLocation = ()=>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>{
                const location = {
                    lat : position.coords.latitude, 
                    long : position.coords.longitude
                }

                console.log("updating captain location")
                socket.emit("update-captain-location", {
                    id : captain._id, 
                    location
                });
            });
            }
        }

        const locationInterval = setInterval(updateLocation, 10000);

        return ()=>{
           clearInterval(locationInterval); 
        } 
    }, []);

    // useEffect(()=>{
    //     // try{
    //     //     const calling = async()=>{
    //     //         const response = await axios.get("/api/ride/liveRide");
    //     //         const data = response.data;

    //     //         // console.log(data.rides);
    //     //         setRides(data.rides);
    //     //     }

    //     //     calling();
    //     // }catch(error){
    //     //     console.log(error.message);
    //     // }

    //     const join = () => {
    //         sendMessage("join", { id: captain._id, type: "captain" });
    //     };

    //     socket.on("join", join);

    //     const handleRideCreated = (data)=>{
    //         console.log(data.message);
    //         alert("New Ride Created");
    //     };

    //     socket.on("rideCreated", handleRideCreated);

    //     return () => {
    //         socket.off("connect", join);
    //         socket.off("rideCreated", handleRideCreated);
    //     };

    // }, [captain, socket]);

    
        useEffect(()=>{
            socket.emit("join", {id : captain._id , type : "captain"});

            socket.on("rideCreated", (data)=>{
                alert(data.message);
                console.log(data);
            });

            return (()=>{
                socket.off("join");
            })
        }, [captain]);

    return (
        <div className="h-screen w-screen">
            {rides.map((ride)=>(
                <RideCard key={ride._id} ride={ride}/>
            ))}
        </div>
    )
}

export default CaptainHome;