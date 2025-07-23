import { Link } from "react-router-dom";
import { CaptainRideContext } from "../../context/CaptainRideContext";
import { SocketContext } from "../../context/SocketContext";
import { useState } from "react";
import axios from "axios";

const ActiveRide = ()=>{
  const [captainRide, setCaptainRide] = CaptainRideContext();
  const {socket} = SocketContext();
  const [status, setStatus] = useState(captainRide?.status || null);

  const startRide = async()=>{
    //Sendig notifications to the client that ride stated;
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ride/${captainRide._id}/start`,  {
        withCredentials : true,
      });
      setStatus("ongoing");
    }catch(error){
      console.log(error.message);
    }
  }

  const endRide = ()=>{
    //Sendig notifications to the client that ride ended;

  }
  
    return (
      <>
      { captainRide? (
        <div className="flex-1 p-16 bg-gray-50 flex flex-col justify-center space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Ride Detail</h1>

            <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Ride ID</span>
                <span className="text-gray-900">{captainRide._id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Pickup</span>
                <span className="text-gray-900 text-right">{captainRide.pickup}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Destination</span>
                <span className="text-gray-900 text-right">{captainRide.destination}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Distance</span>
                <span className="text-gray-900">{captainRide.distance.toFixed(2)} km</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Fare</span>
                <span className="text-green-600 font-semibold">₹{captainRide.fare}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Vehicle Type</span>
                <span className="text-gray-900">{captainRide.vehicleType}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Status</span>
                <span className={`font-semibold capitalize ${
                  status === 'accepted' ? 'text-blue-600' :
                  status === 'pending' ? 'text-yellow-600' :
                  status === 'completed' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600 font-medium">Requested At</span>
                <span className="text-gray-900">{new Date(captainRide.createdAt).toLocaleString()}</span>
              </div>

              {captainRide.captain && (
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Captain Name</span>
                  <span className="text-gray-900">{captainRide.captain.username}</span>
                </div>
              )}
            </div>
          </div>

          { status === 'accepted' &&  ( <button
              onClick={startRide}
              className="w-full p-4 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
            > Start Ride
            </button>)
          }

          { status === 'ongoing' && 
             ( <button
              className="w-full p-4 bg-blue-800 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
            > End Ride
            </button>)
          }      
        </div>
      ) : //If ride doesn't exist
      (
          <div className="h-screen w-screen text-center py-8 flex flex-col items-center justify-center">
            <div className="text-gray-500 mb-4">No active ride currently</div>
            <Link to="/captain/ride/available">
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Check Available Rides
            </button>
            </Link>
          </div>
        )
      }
    </>
    )
}

export default ActiveRide;
