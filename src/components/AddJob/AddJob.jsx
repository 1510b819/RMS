import React from "react";
import "./style.css";

export const AddJob = ({ onClick, className }) => {
  return (
    <div className={`find ${className}`} onClick={onClick}>
      <div className="text-wrapper-4">Add another job</div>
    </div>
  );
};
