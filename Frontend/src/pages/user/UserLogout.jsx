import axios from "axios"
import { useNavigate } from "react-router-dom";

const UserLogout = ()=>{

    
    return <div className="flex items-center justify-center gap-5">
        <h1 className="text-3xl">User Logout <button></button></h1>
        <button 
            onClick={handleClick}
            className="bg-amber-200 rounded-2xl p-5"
        >Logout</button>
    </div>
}

export default UserLogout;