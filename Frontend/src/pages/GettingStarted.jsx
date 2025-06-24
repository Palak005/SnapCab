import { Link } from "react-router-dom";

const GettingStarted = function(){
    return <div className="h-screen w-screen flex items-center justify-center gap-3">
        <div className=" w-1/2 h-1/5 flex flex-col items-center justify-center gap-5">
            <h1 className="text-6xl font-extrabold">Ride Local</h1>
            <h2 className="text-2xl font-bold">Book local tuktuks & autos instantly</h2>
            <h1 className="text-6xl font-extrabold text-[#1a355b]">Ride Easy</h1>
            <h2 className="text-2xl font-bold text-[#1a355b]">Ride with drivers from your community.</h2>
            <Link to="/login" className="w-[500px]">
                <button className="bg-black p-4 w-full rounded-4xl text-2xl font-bold flex items-center justify-center text-white">
                    Get Started
                </button>
            </Link>
        </div>
        <div className="h-full w-1/2 rounded-2xl p-10">
        <img 
            src="https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
            className="bg-cover h-full w-full rounded-2xl"
        />
        </div>
    </div>
}

export default GettingStarted;