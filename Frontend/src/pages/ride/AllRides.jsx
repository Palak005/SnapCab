import axios from "axios";
import { useEffect, useState } from "react";
import RideCard from "../../components/RideCard";

const AllRides = ()=>{
    const [rides, setRides] = useState([]);

    useEffect(()=>{
        const calling = async()=>{
            const response = await axios.get("/api/ride/getRide");
            const data = response.data;

            setRides(data.rides);
        }

        calling();
    }, []);

    return (
        <div className="p-10 pt-20">
            {(!rides || rides.length === 0)? (
                <div className="h-screen w-full flex items-center justify-center">
                <h1 className="font-extrabold text-4xl text-gray-600">No Ride Created Yet</h1>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {rides.map((ride) => (
                    <RideCard key={ride._id} ride={ride} />
                ))}
                </div>
            )}
        </div>
    )
};

export default AllRides;