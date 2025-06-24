import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({children})=>{
    const navigate = useNavigate();
    const captainToken = localStorage.getItem("captainToken");

    useEffect(()=>{
        if(!captainToken) navigate("/captain-login");
    }, [captainToken]);

    return <>
        {children}
    </>
}

export default CaptainProtectWrapper;