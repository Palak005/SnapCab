import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { UserContext } from "../../context/UserContext";

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

            console.log("Signup Successfull : ", response.data);
            setUser(response.data.user);
            localStorage.setItem("userToken", JSON.stringify(response.data.userToken));

            navigate("/home");
        }catch(error){
            console.error('User Signup failed:', error.response?.data || error.message);
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
                    <Link to="/login" className="ml-2 text-black font-medium underline hover:bg-gray-200 transition">
                        Login
                    </Link>
                </div>

                <div className="mt-8 w-full h-[50px] rounded-lg flex items-center justify-center">
                    <Link to="/captain-signup"
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
