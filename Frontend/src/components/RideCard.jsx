import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const RideCard = ({ride})=>{
    const [deleted, setDeleted] = useState(false);

    const handleClick = async()=>{
        try{
            const response = await axios.post(`/api/ride/cancel/${ride._id}`);
            const data = await response.data;

            toast.success(data.message);
            setDeleted(true);

        }catch(error){
            toast.error(error.message);
            console.log(error.message);
        }
    }
    return (
      <>
       {!deleted && <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Ride Details</h1>
        <div className="space-y-4 text-lg text-gray-700">
          <div className="flex gap-3">
            <span className="font-medium">Pickup:</span>
            <span>{ride.pickup}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium">Destination:</span>
            <span>{ride.destination}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium">Fare:</span>
            <span>₹{ride.fare}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium">Distance:</span>
            <span>{Math.round(ride.distance)}</span>
          </div>
          <div className="flex gap-4">
            <span className="font-medium">Status:</span>
            <span>{ride.status}</span>
          </div>
          {ride?.status==="pending" && 
            <button 
                onClick={handleClick}
                className="bg-[#1a355b] hover:bg-[#1a355bc9] text-white w-full p-2.5 rounded-2xl">Cancel Ride</button>
          }
        </div>
      </div>
      }
      </>
    );
}

export default RideCard;