import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CaptainContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import toast from "react-hot-toast";

const CaptainProtectWrapper = ({})=>{
    const navigate = useNavigate();
    const data = localStorage.getItem("captainToken");
    const captainToken = JSON.parse(data);      
    const [captain, setCaptain] = CaptainContext();
    
  const { socket } = SocketContext();

    useEffect(()=>{
        if(!captainToken){
           navigate("/captain/login");
           return; 
        } 

        if(captainToken.expiry<new Date().getTime()){
            //Removing expired token
            localStorage.removeItem("captainToken");
            navigate("/captain/login");
        }


        //Connecting the captain to the socket
        socket.emit("join", {id : captain._id , type : "captain"});

        //Handling ride creation
        socket.on("rideCreated", ()=>{
          toast.custom((t) => (
            <div
              className={`${
                t.visible ? 'animate-enter' : 'animate-leave'
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Attention!!
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      New Ride Request Nearby.
                    </p>
                  </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ))
        });

        //Fetching live location
        let updateLocation = ()=>{
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>{
                const location = {
                    lat : position.coords.latitude, 
                    long : position.coords.longitude
                }

                console.log("updating captain location")

                socket.emit("update-captain-location", {
                    id : captain._id, 
                    location
                });
            });
            }
        }

        const locationInterval = setInterval(updateLocation, 3000);

        return ()=>{
            clearInterval(locationInterval); 
        } 

    }, [socket]);


    return <>
        <Outlet/>
    </>
}

export default CaptainProtectWrapper;