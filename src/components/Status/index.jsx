import React from "react";
import "./style.css";

export const Status = ({ className }) => {
  return (
    <div className={`status ${className}`}>
      <div className="text-wrapper">Status</div>
    </div>
  );
};

