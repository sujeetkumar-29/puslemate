import { createContext } from "react";


export const AdminContext = createContext()

const AdminContextProvider = ( props ) => {
    const value = {
        // Define any state or functions you want to provide to the context
    };
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>  
    )

}

export default AdminContextProvider;  