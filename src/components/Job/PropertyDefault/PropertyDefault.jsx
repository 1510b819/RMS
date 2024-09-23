/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const PropertyDefault = ({ className }) => {
  return (
    <div className={`property-default ${className}`}>
      <img className="caret-down" alt="Caret down" src="https://c.animaapp.com/b7Lhz5U5/img/caretdown-4.svg" />
      <div className="frame">
        <div className="text-wrapper-7">Sort by:</div>
        <div className="text-wrapper-8">Latest</div>
      </div>
    </div>
  );
};
