import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
const LogoutButton = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(DataContext);  // get setter from context

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);       // update context state here
    navigate("/", { replace: true }); 
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      Logout
    </button>
  );
};

export default LogoutButton;
