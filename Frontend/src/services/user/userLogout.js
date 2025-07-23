import axios from "axios";

const logout = async()=>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`,  {
            withCredentials : true,
        });
        
        //Removing token from local storage
        localStorage.removeItem("userToken");
        setuser("");


    }catch(error){
        console.error("Error while logging out : ", error.response?.data || error.message);
    }
}

export default logout;