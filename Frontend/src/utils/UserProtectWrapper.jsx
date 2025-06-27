import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({children})=>{
    const navigate = useNavigate();
    const data = localStorage.getItem("userToken");
    const userToken = JSON.parse(data);

    useEffect(()=>{
        if(!userToken){
           navigate("/user/login");
           return; 
        } 

        if(userToken.expiry<new Date().getTime()){
            //Removing expired token
            localStorage.removeItem("userToken");
            navigate("/user/login");
        }
    });

    return <>
        {children}
    </>
}

export default UserProtectWrapper;