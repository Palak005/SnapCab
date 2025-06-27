import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserContext = ()=>{
    return useContext(UserDataContext);
}


const UserContextProvider = ({children})=>{
    const data = localStorage.getItem("userToken") || null;
    if(!data) return;

    const curr = JSON.parse(data).user;
    const [user, setUser] = useState(curr||null);

    return (
        <UserDataContext.Provider value={[user, setUser]}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContextProvider;