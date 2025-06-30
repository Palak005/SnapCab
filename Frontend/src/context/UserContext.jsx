import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserContext = ()=>{
    return useContext(UserDataContext);
}


const UserContextProvider = ({children})=>{
    let data = localStorage.getItem("userToken") || null;
    if(data) data = JSON.parse(data).user;

    const [user, setUser] = useState(data);

    return (
        <UserDataContext.Provider value={[user, setUser]}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContextProvider;