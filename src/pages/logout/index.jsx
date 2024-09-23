import React from "react";
import { doSignOut } from "../../firebase/auth";

const Logout = () => {
  React.useEffect(() => {
    const handleLogout = async () => {
      try {
        await doSignOut();
        window.location.href = "/login"; 
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    handleLogout();
  }, []); 
  return <div>Logging out...</div>;
};

export default Logout;
