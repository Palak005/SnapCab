import axios from "axios";

const logout = async()=>{
    try{
        const response = await axios.get("/api/user/logout");
        
        //Removing token from local storage
        localStorage.removeItem("userToken");
        setuser("");


    }catch(error){
        console.error("Error while logging out : ", error.response?.data || error.message);
    }
}

export default logout;