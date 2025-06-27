import { createContext, useContext, useState } from "react";

const CaptainDataContext = createContext();

export const CaptainContext = ()=>{
    return useContext(CaptainDataContext);
}

const CaptainContextProvider = ({children})=>{
    let data = localStorage.getItem("captainToken") || null;

    if(data){
       data = JSON.parse(data).captain; 
    }  

    const [captain, setCaptain] = useState(data||null);

    return (
        <CaptainDataContext.Provider value={[captain, setCaptain]}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContextProvider;