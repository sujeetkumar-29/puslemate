import { useState } from "react";
import { createContext } from "react";


export const DoctorContext = createContext()

const DoctorContextProvider = ( props ) => {
    const backendUrl= import.meta.env.VITE_BACKEND_URL

    const [dToken , setDToken]=useState(localStorage.getItem("dToken")? localStorage.getItem("dToken") : "")



    const value = {
        // Define any state or functions you want to provide to the context
        dToken,setDToken,
        backendUrl
    };
    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>  
    )

}

export default DoctorContextProvider;