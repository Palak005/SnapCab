import axios from "axios"
import { useState } from "react";

const GetCoord = ()=>{
    const [suggestions, setSuggestions] = useState([]);
    const [address, setAddress] = useState("");

    const handleSearch = async(e)=>{
        console.log(address);
        const response = await axios.get('/api/autoSuggestions', {
            params : {address},
        });

        setSuggestions(response.data.suggestedLocations);
        console.log(response)
    }

    const handleClick = async()=>{

        try{
            console.log(address);
            const response = await axios.post("/api/map/geoCoding", {address});

            console.log(response);
        } catch(error){
            console.log(error);
        }
    };

    return <div className="flex items-center justify-center gap-3.5">
        <div >
            <div>
                <input 
                    className="px-8 py-5 border-2" 
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                />   
                <button onClick={handleSearch} className="p-5 border-2"> Search</button>
            </div>
            <div>
                {suggestions.map((suggestion)=>{
                    return (
                        suggestion.type !== "CITY" && (
                            <h1 key={suggestion.eLoc}>{suggestion.placeAddress}</h1>
                        )
                    )
                })}
            </div>
        </div>
      
        <button className="px-8 py-5 bg-amber-200" onClick={handleClick}>
            Click to get Geocode
        </button>
    </div>
}

export default GetCoord;