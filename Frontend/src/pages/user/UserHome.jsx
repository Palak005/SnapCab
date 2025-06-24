import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//User can enter pickup and destination address
//Request for a ride

const UserHome = function(){
    const [pickup, setPickup] = useState("");
    const [destination, setDestination] = useState("");
    const [vehicle, setVehicle] = useState("bike");
    const [pickupSuggest, setpickupSuggest] = useState([]);
    const [destSuggest, setdestSuggest] = useState([]);
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();

    const handleSearch = async(address, type)=>{
        const response = await axios.get('/api/map/autoSuggestion', {
            params : {address},
        });

        if(type === "pickup") setpickupSuggest(response.data.suggestedLocations);
        else setdestSuggest(response.data.suggestedLocations);
        console.log(response)
    }

    const createRide = async()=>{
        //Making api call to book a ride
        console.log(pickup, destination,vehicle);
        try{
            const response = await axios.post("/api/ride/create", {pickup, destination,vehicleType:vehicle});
            console.log(response.data);

            navigate("/ride/:id");
            
        }catch(error){
            console.error(error.message);
        }
    }

    const selectSuggest = (suggestion)=>{
        if(focusedField == 'pickup'){
            setPickup(suggestion.placeAddress);
            setpickupSuggest([]);
        }else{
            setDestination(suggestion.placeAddress);
            setdestSuggest([]);
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
        }, 1000);

        return ()=> clearTimeout(debounce);

    }, [pickup, destination, focusedField]);

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
        />
        {pickupSuggest?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow z-50 mt-1 max-h-60 overflow-y-auto">
            {pickupSuggest.map(
              (suggestion) =>
                suggestion.type !== "CITY" && (
                  <div
                    key={suggestion.eLoc}
                    className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                    onClick={() => selectSuggest(suggestion)}
                  >
                    {suggestion.placeAddress}
                  </div>
                )
            )}
          </div>
        )}
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
        {destSuggest?.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow z-50 mt-1 max-h-60 overflow-y-auto">
            {destSuggest.map(
              (suggestion) =>
                suggestion.type !== "CITY" && (
                  <div
                    key={suggestion.eLoc}
                    className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                    onClick={() => selectSuggest(suggestion)}
                  >
                    {suggestion.placeAddress}
                  </div>
                )
            )}
          </div>
        )}
      </div>

      {/* Vehicle Selection */}
      <select
        onChange={(e) => setVehicle(e.target.value)}
        value={vehicle}
        className="w-full border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="car">Car</option>
        <option value="auto">Auto</option>
        <option value="bike">Bike</option>
        <option value="auto">Tukk Tukk</option>
      </select>

      {/* Book Ride Button */}
      <button
        onClick={createRide}
        className="w-full p-4 bg-black text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all hover:-translate-y-1"
      >
        Book Ride
      </button>
    </div>

    {/* Right: Image Card */}
    <div className="flex-1 relative">
      <img
        src="https://images.unsplash.com/photo-1731178683825-07c4552940ae?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Ride Background"
        className="w-full h-full object-cover"
      />
      {/* Optional: Overlay text or blur effect */}
      <div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xl p-4 backdrop-blur-sm">
        Your Ride, On Demand
      </div>
    </div>
  </div>
);


}

export default UserHome;