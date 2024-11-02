import { GlobalContext } from "@/contexts/GlobalContext";
import react, { useContext } from "react";

const WelcomeText = () => {
    const { user } = useContext(GlobalContext)
    return user ? <h1 className="head-text">Welcome, {user}</h1> : ""
}

export default WelcomeText