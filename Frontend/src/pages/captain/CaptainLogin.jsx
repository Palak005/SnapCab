import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { CaptainContext } from "../../context/CaptainContext";

const CaptainLogin = () => {
    const [captain, setCaptain] = CaptainContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();   
        
        alert("Form submitted : ");
        const captainData = {
            email,
            password
        }
        
        try{
            const response = await axios.post('api/captain/login', captainData);

            console.log("Captain Logged in : ", response.data.message);
            setCaptain(response.data.captain);
            localStorage.setItem("captainToken", response.data.captainToken);
            console.log(captain);
            
            navigate("/home");

        } catch(error){
            console.error('Login failed:', error.response?.data || error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-12">
                <h2 className="text-3xl font-extrabold text-[#1a355b] mb-10 text-center">
                    Login as Captain
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-base text-gray-700 mb-2">
                            Captain's Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            className="w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-gray-800 text-base transition"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-black text-white rounded-lg text-base font-semibold hover:bg-gray-700 transition"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center text-base text-gray-600 mt-8">
                    Don't have an Account?
                    <Link to="/captain-signup" className="ml-2 text-black font-medium underline hover:bg-gray-200 transition">
                        Signup
                    </Link>
                </div>

                <div className="mt-8 w-full h-[50px] rounded-lg flex items-center justify-center">
                    <Link to="/login"
                        className="w-full py-4 rounded-lg bg-[#1a355b] text-white text-base text-center font-medium hover:bg-[#1a355bd3] transition"
                    >
                        Login as User
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CaptainLogin;
