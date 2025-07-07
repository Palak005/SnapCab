import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const UserRideDataContext = createContext();

export const UserRideContext = ()=>{
    return useContext(UserRideDataContext);
}

export const UserRideContextProvider = ({children})=>{
    const [currRide, setCurrRide] = useState(null);
    return (
        <UserRideDataContext.Provider value={[currRide, setCurrRide]}>
            {children}
        </UserRideDataContext.Provider>
    )
}