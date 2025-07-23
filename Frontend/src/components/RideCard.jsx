import React, { useContext } from 'react';
import { useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import axios from "axios";
import { CaptainContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import { CaptainRideContext } from '../context/CaptainRideContext';

const RideCard = ({ ride }) => {
  const [cancel, setCancel] = useState(false);
  const [captain] = CaptainContext();
  const [captainRide, setCaptainRide] = CaptainRideContext();
  const navigate = useNavigate();

  const { 
    _id: rideId,
    user,
    status,
    createdAt,
    pickup,
    destination,
    vehicleType,
    fare,
    distance
  } = ride;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDistance = (km) => {
    return km.toFixed(1) + ' km';
  };

  const formatFare = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleClick = async()=>{
    try{
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ride/${rideId}/accept`, {
        captainId : captain._id,
      }, {
        withCredentials : true,
      });

        const data = response.data;

        const token = {
            captainRide : data.ride,
            expiry : new Date().getTime() + 24*60*60*1000,
        }

        localStorage.setItem("captainRideToken", JSON.stringify(token));
        setCaptainRide(data.ride);
        navigate("/captain/ride/active")
    }catch(error){
      console.log(error);
    }
  }

  return (
    !cancel && <div className="flex flex-col md:flex-row border border-gray-200 rounded-lg shadow-sm p-4 w-full my-4 bg-white">
      {/* Left Section - User and Location Info */}
      <div className="flex-1 mr-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold text-gray-800">Ride Details</h3>
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
            {status.toUpperCase()}
          </span>
        </div>

        {/* User Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium text-gray-700">User Information</p>
          <div className="mt-1">
            <p className="text-sm">
              <span className="text-gray-500">Name:</span> {user.username}
            </p>
            <p className="text-sm">
              <span className="text-gray-500">Email:</span> {user.email}
            </p>
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-3 mb-4">
          <div>
            <p className="font-medium text-gray-700 mb-1 flex items-center">
              Pickup Location
            </p>
            <p className="text-gray-600 pl-5 text-sm">{pickup}</p>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-1 flex items-center">
              Destination
            </p>
            <p className="text-gray-600 pl-5 text-sm">{destination}</p>
          </div>
        </div>
      </div>

      {/* Right Section - Ride Info and Actions */}
      <div className="flex flex-col justify-between w-full md:w-64">
        {/* Ride Meta Info */}
        <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 p-2 rounded-lg mb-4">
          <div className="p-2">
            <p className="text-xs text-gray-500 font-medium">Vehicle</p>
            <p className="font-semibold">{vehicleType}</p>
          </div>
          <div className="p-2">
            <p className="text-xs text-gray-500 font-medium">Distance</p>
            <p className="font-semibold">{formatDistance(distance)}</p>
          </div>
          <div className="p-2">
            <p className="text-xs text-gray-500 font-medium">Fare</p>
            <p className="font-semibold">{formatFare(fare)}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleClick}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Accept
          </button>
          <button 
            onClick={() => setCancel(true)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-gray-500 flex justify-between items-center">
          <p>Ride ID: {rideId}</p>
          <p>{formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default RideCard;