import { useEffect, useState } from "react";
import RideCard from "../../components/RideCard";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";

const UserRecentRides = ()=>{  
    const [rides, setRides] = useState([]);
    const [user, setUser] = UserContext();
    const {socket} = SocketContext();

    useEffect(()=>{
        try{
            //Fetching Available Ride Data
            const calling = async()=>{
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ride/completedRide`,  {
                    withCredentials : true,
                });
                const allRides = response.data.rides;
                const filtered = allRides.filter((ride)=> ride.user._id === user._id);
                
                setRides(filtered);
            }

            calling();
        }catch(error){
            console.log(error.message);
        }
    }, []);

    return (
        <div className="h-screen w-screen p-12 mt-8">
            {rides.map((ride)=>(
                <div key={ride._id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg shadow-sm p-4 w-full my-4 bg-white">
                {/* Left Section - User and Location Info */}
                <div className="flex-1 mr-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Ride Details</h3>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        {ride.status.toUpperCase()}
                    </span>
                    </div>

                    {/* Location Details */}
                    <div className="space-y-3 mb-4">
                    <div>
                        <p className="font-medium text-gray-700 mb-1 flex items-center">
                        Pickup Location
                        </p>
                        <p className="text-gray-600 pl-5 text-sm">{ride.pickup}</p>
                    </div>

                    <div>
                        <p className="font-medium text-gray-700 mb-1 flex items-center">
                        Destination
                        </p>
                        <p className="text-gray-600 pl-5 text-sm">{ride.destination}</p>
                    </div>
                    </div>
                </div>

                {/* Right Section - Ride Info and Actions */}
                <div className="flex flex-col justify-between w-full md:w-64">
                    {/* Ride Meta Info */}
                    <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-2 rounded-lg mb-4">
                    <div className="p-2">
                        <p className="text-xs text-gray-500 font-medium">Vehicle</p>
                        <p className="font-semibold">{ride.vehicleType}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-xs text-gray-500 font-medium">Distance</p>
                        <p className="font-semibold">{ride.distance}</p>
                    </div>
                    <div className="p-2">
                        <p className="text-xs text-gray-500 font-medium">Fare</p>
                        <p className="font-semibold">{ride.fare}</p>
                    </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                    <div>
                        <p className="font-medium text-gray-700 mb-1 flex items-center">
                        Captain : {ride.captain.username}
                        </p>
                    </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
                    <p>Ride ID: {ride._id}</p>
                    <p>{ride.createdAt}</p>
                    </div>
                </div>
                </div>
            ))}
        </div>
    )
}

export default UserRecentRides;