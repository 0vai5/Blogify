import react, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{isLoggedIn, user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}