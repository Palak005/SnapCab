import { createContext, useContext, useState } from "react";

const CaptainDataContext = createContext();

export const CaptainContext = ()=>{
    return useContext(CaptainDataContext);
}

const CaptainContextProvider = ({children})=>{
    const [captain, setCaptain] = useState({});

    return (
        <CaptainDataContext.Provider value={[captain, setCaptain]}>
            {children}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContextProvider;