import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { CaptainContext } from "../../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainNavbar = ()=>{
  const location = useLocation();
    const [captain, setCaptain] = CaptainContext();
  const navItems = [
    { name: "Available Rides", path: "/captain/ride/available" },
    { name: "Active Ride", path: "/captain/ride/active" },
    { name: "Recent Trips", path: "/captain/trips" },
    { name: "My Profile", path: "/captain/profile" },
  ];

  const { socket } = SocketContext();
  

  useEffect(()=>{
      socket.emit("join", {id : captain._id , type : "captain"});

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
  }, []);


  useEffect(()=>{
      socket.on("rideCreated", (data)=>{
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
  }, [socket]);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-10 py-4 flex justify-between items-center z-50">
      {/* Brand Logo */}
      <div>
        <span className="text-4xl font-extrabold text-[#1a355b]">Snap</span>
        <span className="text-4xl font-extrabold text-gray-800">Cab</span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path}>
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                location.pathname === item.path
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.name}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default CaptainNavbar;