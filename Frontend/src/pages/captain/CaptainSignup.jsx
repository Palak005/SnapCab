import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { CaptainContext } from "../../context/CaptainContext";
import toast from "react-hot-toast";

const CaptainSignup = () => {
    const navigate = useNavigate();
    const [captain, setCaptain] = CaptainContext();
    const [captainDetails, setCaptainDetails] = useState({
        username: "",
        email: "",
        password: "",
        color : "",
        plate : "",
        capacity : "",
        vehicleType : "Car"
    });

    const handleChange = (e)=>{
        setCaptainDetails({
            ...captainDetails,
            [e.target.id] : e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await axios.post("/api/captain/signup", captainDetails);
            const data = response.data;
            
            setCaptain(data.captain);
            const token = {
                captain : data.captain,
                expiry : new Date().getTime() + 24*60*60*1000
            }

            localStorage.setItem("captainToken", JSON.stringify(token));
            
            toast.success(data.message);
            
            navigate("/captain/home");

        }catch(error){
            toast.error(error.response.data.message);
            console.error('Captain Signup failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="max-h-screen bg-gray-50 flex items-center justify-center mt-15">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-4 px-15 mt-5">
                {/* <h2 className="text-3xl font-extrabold text-[#1a355b] mb-5 text-center">
                    SignUp as Captain
                </h2> */}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-base text-gray-700 mb-2">
                            Enter Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="you@example.com"
                            value={captainDetails.username}
                            className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-base text-gray-700 mb-2">
                            Enter Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={captainDetails.email}
                            className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-base text-gray-700 mb-2">
                            Enter Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={captainDetails.password}
                            className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                        />
                    </div>

                                        
                    <label htmlFor="vechicle-input" className="text-gray-700 mb-2 block">
                        Enter Vehicle Details
                    </label>

                    <div id="vechicle-input" className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <input
                                id="color"
                                name="color"
                                type="text"
                                placeholder="Enter Color"
                                value={captainDetails.color}
                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                                onChange={handleChange}
                                required
                            />
                            <input
                                id="plate"
                                name="plate"
                                type="text"
                                placeholder="Enter Plate Number"
                                value={captainDetails.plate}
                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <input
                                id="capacity"
                                name="capacity"
                                type="number"
                                placeholder="Enter Capacity"
                                value={captainDetails.capacity}
                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                                onChange={handleChange}
                                required
                            />
                            <select
                                id="vehicleType"
                                name="vehicleType"
                                value={captainDetails.vehicleType}
                                className="w-full px-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Car">Car</option>
                                <option value="Bike">Bike</option>
                                <option value="Auto">Auto</option>
                                <option value="Tukk Tukk">Tukk Tukk</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-5 bg-black text-white rounded-lg text-base font-bold hover:bg-gray-700 transition"
                    >
                        Create Captain Account
                    </button>
                </form>

                <div className="text-center text-base text-gray-600 mt-4">
                    Already have an Account?
                    <Link to="/captain/login" className="ml-2 text-black font-medium underline transition">
                        Login
                    </Link>
                </div>

                <div className="mt-8 w-full h-[50px] rounded-lg flex items-center justify-center">
                    <Link to="/user/signup"
                        className="w-full py-3 rounded-lg bg-[#1a355b] text-white text-base text-center font-medium hover:bg-[#1a355bc4] transition"
                    >
                        Signup as User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaptainSignup;
