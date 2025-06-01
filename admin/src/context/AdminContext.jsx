import { createContext } from "react";
import React, { useState } from 'react';


export  const AdminContext = createContext()

export const AdminContextProvider = ( props ) => {
    const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken") : "");
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const value = {
        // Define any state or functions you want to provide to the context
        aToken,
        setAToken, 
        backendUrl
    };
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>  
    )

}

// export default AdminContextProvider;  