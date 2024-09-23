import React from "react";
import "./style.css";

export const LogOut = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={`log-out ${className}`}>
      <div className="logout-wrapper">Log Out</div>
    </div>
  );
};
