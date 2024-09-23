import React from "react";
import "./style.css";

export const JobPosting = ({ divClassName }) => {
  return (
    <div className="job-posting">
      <div className={`text-wrapper ${divClassName}`}>Job Posting</div>
    </div>
  );
};

