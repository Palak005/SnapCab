import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({children})=>{
    const navigate = useNavigate();
    const userToken = localStorage.getItem("userToken");

    useEffect(()=>{
        if(!userToken) navigate("/login");
    });

    return <>
        {children}
    </>
}

export default UserProtectWrapper;