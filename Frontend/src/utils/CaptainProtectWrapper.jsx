import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({children})=>{
    const navigate = useNavigate();
    const data = localStorage.getItem("captainToken");
    const captainToken = JSON.parse(data);

    useEffect(()=>{
        if(!captainToken){
           navigate("/captain/login");
           return; 
        } 

        if(captainToken.expiry<new Date().getTime()){
            //Removing expired token
            localStorage.removeItem("captainToken");
            navigate("/captain/login");
        }
    });

    return <>
        {children}
    </>
}

export default CaptainProtectWrapper;