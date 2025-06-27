import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const UserSignup = () => {
    const [user, setUser] = UserContext();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e)=>{
        setUserDetails({
            ...userDetails,
            [e.target.id] : e.target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{

            const response = await axios.post("/api/user/signup", userDetails);
            const data = response.data;

            setUser(data.user);
            const token = {
                user : data.user,
                expiry : new Date().getTime() + 24*60*6*1000,
            }

            localStorage.setItem("userToken", JSON.stringify(token));

            toast.success(data.message);
            navigate("/user/createRide");
        }catch(error){
            toast.error(error.response.data.message);
            console.error('User Signup failed:', error.response?.data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-12">
                <h2 className="text-3xl font-extrabold text-[#1a355b] mb-10 text-center">
                    SignUp to SnapCab
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-base text-gray-700 mb-2">
                            Enter Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="you@example.com"
                            value={userDetails.username}
                            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                            required
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
                            value={userDetails.email}
                            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                            required
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
                            value={userDetails.password}
                            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-black text-white rounded-lg text-base font-semibold hover:bg-gray-700 transition"
                    >
                        Create User Account
                    </button>
                </form>

                <div className="text-center text-base text-gray-600 mt-8">
                    Already have an Account?
                    <Link to="/user/login" className="ml-2 text-black font-medium underline hover:bg-gray-200 transition">
                        Login
                    </Link>
                </div>

                <div className="mt-8 w-full h-[50px] rounded-lg flex items-center justify-center">
                    <Link to="/captain/signup"
                        className="w-full py-4 rounded-lg bg-[#1a355b] text-white text-base text-center font-medium hover:bg-[#1a355bd0] transition"
                    >
                        Signup as Captain
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;
