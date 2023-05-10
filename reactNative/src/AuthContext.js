// import React, {createContext, useState} from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//     const [isLoading, setIsLoading] =useState(true);
//     const [authToken, setAuthToken] =useState(null);
//     const login =()=>{
//         setAuthToken("asdwww1");    
//         setIsLoading(false);

//     }
//     const logout = ()=>{
//         setAuthToken(null);
//         setIsLoading(false);
//     }
//     return(
//         <AuthContext.Provider value={{login, logout, isLoading, authToken}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }