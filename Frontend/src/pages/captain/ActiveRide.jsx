import { Link } from "react-router-dom";

const ActiveRide = ()=>{
    return ((
          <div className="h-screen w-screen text-center py-8 flex flex-col items-center justify-center">
            <div className="text-gray-500 mb-4">No active ride currently</div>
            <Link to="/captain/ride/available">
            <button 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Check Available Rides
            </button>
            </Link>
          </div>
        )

    )
}

export default ActiveRide;
