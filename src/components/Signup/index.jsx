import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const SignUp = ({ property1, className }) => {
  return (
    <div className={`sign-up ${className}`}>
      <div className={`text-wrapper ${property1}`}>Sign Up</div>
    </div>
  );
};

SignUp.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};

