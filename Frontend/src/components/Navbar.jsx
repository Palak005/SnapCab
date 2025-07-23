import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Navbar = () => {
    const [user, setuser] = UserContext();
    const navigate = useNavigate();

    const handleClick = async()=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {withCredentials : true});

            console.log(response.data.message);
            
            //Removing token from local storage
            localStorage.removeItem("userToken");
            navigate("/user/login");
            setuser(null);

        }catch(error){
            console.error("Error while logging out : ", error.response?.data || error.message);
        }
        
    }

  return (
    <>
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-10 py-4 flex justify-between items-center z-50">
      {/* Brand name on the left */}
      <div>
      <span className="text-4xl font-extrabold text-[#1a355b]">Snap</span>
      <span className="text-4xl font-extrabold text-gray-800">Cab</span>        
      </div>

      <div className='flex justify-end gap-10'>
        <Link to="/user/createRide">
          <button
            className={`font-bold px-6 py-3 rounded-3xl transition-all ${
              location.pathname === "/user/createRide"
                ? "bg-[#1a355b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Create Ride
          </button>
        </Link>
        <Link to="/user/ride/completed">
          <button
            className={`font-bold px-6 py-3 rounded-3xl transition-all ${
              location.pathname === "/user/ride/completed"
                ? "bg-[#1a355b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Recent Trips
          </button>
        </Link>
        {user? (
          <button
            onClick={handleClick}
            className={`font-bold px-6 py-3 rounded-3xl transition-all ${
              location.pathname === "/user/profile"
                ? "bg-[#1a355b] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Logout
          </button>
        ) : (
          <Link to="/user/login">
          <button
            className={`font-bold px-6 py-3 rounded-3xl transition-all ${
              (location.pathname === "/user/login" || location.pathname == "/user/signup")
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
};

export default Navbar;



