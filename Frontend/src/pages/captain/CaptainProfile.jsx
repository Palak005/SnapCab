import { useState } from "react";
import { CaptainContext } from "../../context/CaptainContext";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import toast from "react-hot-toast";

const CaptainProfile = ()=>{
    const [captain, setCaptain] = CaptainContext();   
    const navigate = useNavigate();
    console.log(captain);

    const handleClick = async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/captain/logout`, {
              withCredentials : true,
            });
            toast.success(response.data.message);

            //Removing token from local storage
            setCaptain(null);
            localStorage.removeItem("captainToken");
            navigate("/captain/login");

        }catch(error){
            console.error("Error while logging out : ", error.response?.data || error.message);
        }
        
    }
  
    return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6  p-12">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Driver Profile</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold">
                    {captain.username.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{captain.username}</h3>
                    <div className="flex items-center">
                      {/* <span className="text-yellow-400 mr-1">★</span>
                      <span>{captain.rating} ({captain.totalRides} rides)</span> */}
                    </div>
                  </div>
                  </div>
                  <button 
                    onClick={handleClick}
                    className="px-4 py-2 bg-[#1A355B] rounded-3xl text-white font-bold"
                  >Logout</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <InfoCard title="Vehicle Details" value={captain.vehicle.vehicleType} />
                  <InfoCard title="License Number" value={captain.vehicle.plate} />
                  <InfoCard title="Member Since" value={(new Date(captain.createdAt)).toDateString()} />
                  <InfoCard title="Email" value={captain.email}/>
                </div>
              </div>
            </div>
          </div>
        )
}

const InfoCard = ({ title, value }) => (
  <div className="border rounded-lg p-3">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <p className="font-medium">{value}</p>
  </div>
);

const StatCard = ({ title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <h4 className="text-sm text-gray-500">{title}</h4>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default CaptainProfile;