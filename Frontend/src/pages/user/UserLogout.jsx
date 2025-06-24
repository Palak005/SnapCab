import axios from "axios"
import { useNavigate } from "react-router-dom";

const UserLogout = ()=>{
    const navigate = useNavigate();

    const handleClick = async()=>{
        try{
            const response = await axios.get("/api/user/logout");

            console.log(response.data.message);

            //Removing token from local storage
            localStorage.removeItem("userToken");
            navigate("/login");


        }catch(error){
            console.error("Error while logging out : ", error.response?.data || error.message);
        }
        
    }
    
    return <div className="flex items-center justify-center gap-5">
        <h1 className="text-3xl">User Logout <button></button></h1>
        <button 
            onClick={handleClick}
            className="bg-amber-200 rounded-2xl p-5"
        >Logout</button>
    </div>
}

export default UserLogout;