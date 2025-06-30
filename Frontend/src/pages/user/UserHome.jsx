import { useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import RidePopup from "../../components/RidePopup";
import { HomeRightCard } from "../../components/HomeRightCard";
import { SuggestionContainer } from "../../components/SuggestionContainer";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/UserContext";

//User can enter pickup and destination address
//Request for a ride

const UserHome = function(){

    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [vehicle, setVehicle] = useState("Bike");
    const [pickupSuggest, setpickupSuggest] = useState([]);
    const [destSuggest, setdestSuggest] = useState([]);
    const [focusedField, setFocusedField] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [ride , setRide] = useState({});
    
    const {socket} = SocketContext();
    const [user, setUser] = UserContext();

    const handleSearch = async(address, type)=>{
        const response = await axios.get('/api/map/autoSuggestion', {
            params : {address},
        });

        if(type === "pickup") setpickupSuggest(response.data.suggestedLocations);
        else setdestSuggest(response.data.suggestedLocations);
    }

    const createRide = async()=>{

        //Making api call to book a ride
        if(!pickup || !destination || !vehicle){
          toast.error("All Fields Are Required")
        }

        try{
            const response = await axios.post("/api/ride/create", {pickup, destination,vehicleType:vehicle});
            const data = response.data;

            toast.success(data.message);
            setRide(data.ride);
            setShowPopup(true);

        }catch(error){
          toast.error(error.response.data.message);
          console.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const address = focusedField === 'pickup'? pickup : destination;
        if(!address){
            if(focusedField === 'pickup') setpickupSuggest([]);
            else setdestSuggest([]);
            return;
        }


        const debounce = setTimeout(()=>{
            handleSearch(address, focusedField);
        }, 800);

        return ()=> clearTimeout(debounce);

    }, [pickup, destination, focusedField]);

    useEffect(()=>{
      socket.emit("join", {id : user._id , type : "user"})
    }, [user]);

return (
  <div className="h-screen w-screen flex">
    {/* Left: Booking Form */}
    <div className="flex-1 p-16 bg-gray-50 flex flex-col justify-center space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Book a Ride</h1>
        <p className="text-lg text-gray-500">Enter your trip details to get started</p>
      </div>

      {/* Pickup Input + pickupSuggest */}
      <div className="relative">
        <input
          onChange={(e) => setPickup(e.target.value)}
          type="text"
          value={pickup}
          onFocus={() => setFocusedField("pickup")}
          placeholder="Pickup Location"
          className="w-full border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {pickupSuggest?.length > 0 && (<SuggestionContainer suggestions={pickupSuggest} set={setPickup} setSuggest={setpickupSuggest}/>)}
      </div>

      {/* Destination Input */}
      <div className="relative">
      <input
        onChange={(e) => setDestination(e.target.value)}
        type="text"
        value={destination}
        onFocus={() => setFocusedField("destination")}
        placeholder="Destination"
        className="w-full border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {destSuggest?.length > 0 && (<SuggestionContainer suggestions={destSuggest} set={setDestination} setSuggest={setdestSuggest}/>)}
      </div>

      {/* Vehicle Selection */}
      <select
        onChange={(e) => setVehicle(e.target.value)}
        value={vehicle}
        className="w-full border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="Car">Car</option>
        <option value="Auto">Auto</option>
        <option value="Bike">Bike</option>
        <option value="Tukk Tukk">Tukk Tukk</option>
      </select>

      {/* Book Ride Button */}
      <button
        onClick={createRide}
        className="w-full p-4 bg-black text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
      >
        Book Ride
      </button>
    </div>

    {/* Image Card on Right */}
    <HomeRightCard/>
    {showPopup && <RidePopup setShowPopup={setShowPopup} ride={ride}/>}
  </div>
);


}

export default UserHome;