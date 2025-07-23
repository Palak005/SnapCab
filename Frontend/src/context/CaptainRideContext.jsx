import { createContext, useContext, useState } from "react";

const RideDataContext = createContext();

export const CaptainRideContext = ()=>{
    return useContext(RideDataContext);
}

export const CaptainRideContextProvider = ({children})=>{
    let data = localStorage.getItem("captainRideToken");

    // console.log(userRide, expiresIn);
    if(data){
        data = JSON.parse(data);
        console.log(data.expiry< new Date().getTime())
        if(data.expiry< new Date().getTime()) data = null;
        else data = data.captainRide;
    }
    
    const [captainRide, setCaptainRide] = useState(data);

    return (
        <RideDataContext.Provider value={[captainRide, setCaptainRide]}>
            {children}
        </RideDataContext.Provider>
    )
}