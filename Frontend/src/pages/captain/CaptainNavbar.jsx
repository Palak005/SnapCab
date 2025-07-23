import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { CaptainContext } from "../../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainNavbar = ()=>{
    const [captain, setCaptain] = CaptainContext();
    const location = useLocation();
    console.log(captain);

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-10 py-4 flex justify-between items-center z-50">
      {/* Brand Logo */}
      <div>
        <span className="text-4xl font-extrabold text-[#1a355b]">Snap</span>
        <span className="text-4xl font-extrabold text-gray-800">Cab</span>
      </div>
  
      {/* Navigation Links */}
      <div className="space-x-6">
          <Link to="/captain/ride/available">
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                location.pathname === "/captain/ride/available"
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Available Rides
            </button>
          </Link>
          <Link to="/captain/ride/active">
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                location.pathname === "/captain/ride/active"
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Active Ride
            </button>
          </Link>
          <Link to="/captain/ride/completed">
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                location.pathname === "/captain/ride/completed"
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Recent Trips
            </button>
          </Link>
          {captain? (
            <Link to="/captain/profile">
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                location.pathname === "/captain/profile"
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Profile
            </button>
          </Link>
          ) : (
            <Link to="/captain/login">
            <button
              className={`font-bold px-5 py-2 rounded-3xl transition-all ${
                (location.pathname === "/captain/login" || location.pathname == "/captain/signup")
                  ? "bg-[#1a355b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Login
            </button>
          </Link>
          )}
      </div>
    </nav>
    <Outlet/>
    </>
  );
}

export default CaptainNavbar;