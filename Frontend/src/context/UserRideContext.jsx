import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const UserRideDataContext = createContext();

export const UserRideContext = ()=>{
    return useContext(UserRideDataContext);
}

export const UserRideContextProvider = ({children})=>{
    let data = localStorage.getItem("userRideToken");

    // console.log(userRide, expiresIn);
    if(data){
        data = JSON.parse(data);
        console.log(data.expiry< new Date().getTime())
        if(data.expiry< new Date().getTime()) data = null;
        else data = data.userRide;
    }
    
    const [currRide, setCurrRide] = useState(data);
    return (
        <UserRideDataContext.Provider value={[currRide, setCurrRide]}>
            {children}
        </UserRideDataContext.Provider>
    )
}