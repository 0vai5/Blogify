import react, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    // TODO: The Pages are not Redirecting to a new route in protected routes
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{isLoggedIn, user, setUser}}>
            {children}
        </GlobalContext.Provider>
    )
}