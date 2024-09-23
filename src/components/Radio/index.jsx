import React from "react";
import PropTypes from "prop-types";

const variants = {
  primary: "bg-white-A700 checked:bg-white-A700 checked:focus:bg-white-A700",
};
const sizes = {
  xs: "h-[8px] w-[8px] rounded",
  sm: "h-[16px] w-[16px] rounded-lg",
};

const Radio = React.forwardRef(
  ({ className = "", name = "", label = "", id = "radio_id", variant = "primary", size = "sm", ...restProps }, ref) => {
    return (
      <label className={className + " flex items-center gap-[5px] cursor-pointer"}>
        <input
          className={` ${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""}`}
          ref={ref}
          type="radio"
          name={name}
          {...restProps}
          id={id}
        />
        <span>{label}</span>
      </label>
    );
  },
);

Radio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  size: PropTypes.oneOf(["xs", "sm"]),
  variant: PropTypes.oneOf(["primary"]),
};

export { Radio };
