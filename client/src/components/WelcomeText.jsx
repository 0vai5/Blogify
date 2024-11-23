import { UserContext } from "@/contexts/UserContext";
import react, { useContext } from "react";

const WelcomeText = () => {
  const { user } = useContext(UserContext);

  return <>{user && <h1 className="head-text">Welcome {user}</h1>}</>;
};

export default WelcomeText;
