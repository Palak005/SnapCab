import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const UserContext = ()=>{
    return useContext(UserDataContext);
}


const UserContextProvider = ({children})=>{
    const [user, setUser] = useState({
        username : "",
        email : ""
    });

    return (
        <UserDataContext.Provider value={[user, setUser]}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContextProvider;