import { createContext } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { io } from "socket.io-client"

const socket = io("http://localhost:3000/");
const SocketDataContext = createContext();

export const SocketContext  = ()=>{
    return useContext(SocketDataContext);
}

export const SocketContextProvider = ({children})=>{  
    useEffect(()=>{
        socket.on("connect", ()=>{
            console.log("Connected to server");
        });

        socket.on("disconnect", ()=>{
            console.log("Disconnected from server");
        })
    }, []);

    return (
        <SocketDataContext.Provider value={{socket}}>
           {children} 
        </SocketDataContext.Provider>
        
    )
};



