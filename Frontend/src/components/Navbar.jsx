import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Navbar = () => {
    const [user, setuser] = UserContext();
    const navigate = useNavigate();

    const handleClick = async()=>{
        try{
            const response = await axios.get("/api/user/logout");

            console.log(response.data.message);

            //Removing token from local storage
            localStorage.removeItem("userToken");
            setuser("");
            navigate("/user/login");


        }catch(error){
            console.error("Error while logging out : ", error.response?.data || error.message);
        }
        
    }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-10 py-4 flex justify-between items-center z-50">
      {/* Brand name on the left */}
      <div>
      <span className="text-4xl font-extrabold text-[#1a355b]">Snap</span>
      <span className="text-4xl font-extrabold text-gray-800">Cab</span>        
      </div>


      {/* Buttons on the right */}
      <div className="space-x-7">
        <Link to="/user/createRide">
        <button className="bg-[#1a355b] text-white font-bold px-5 py-3 rounded-3xl hover:bg-[#1a355bde] transition">
          Create Ride
        </button>
        </Link>
        
        {user? (
            <Link to="/user/login">
                <button onClick={handleClick} className="bg-black text-white font-bold px-6 py-3 rounded-3xl hover:bg-gray-800 transition">
                Logout
                </button>
            </Link>
        ) : (
        <Link to="/user/login">
            <button className="bg-black text-white font-bold px-6 py-3 rounded-3xl hover:bg-gray-800 transition">
            Login
            </button>
        </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
