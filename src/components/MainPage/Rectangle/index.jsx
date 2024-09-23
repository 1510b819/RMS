import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Rectangle = ({ property1, className }) => {
  return (
    <img
      className={`rectangle ${property1} ${className}`}
      alt="Property default"
      src={property1 === "variant-2" ? "property-1-variant2.svg" : "property-1-default.svg"}
    />
  );
};

Rectangle.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};

