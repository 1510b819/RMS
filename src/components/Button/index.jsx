import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-sm",
};
const variants = {
  fill: {
    white_A700: "bg-white-A700 text-gray-900",
    gray_50: "bg-gray-50 text-light_blue-800",
    light_blue_800: "bg-light_blue-800 shadow-xs text-white-A700",
    blue_600: "bg-blue-600 text-white-A700",
    gray_300: "bg-gray-300 text-blue-500",
  },
};
const sizes = {
  xl: "h-[40px] pl-[26px] pr-[31px] text-[25px]",
  "7xl": "h-[77px] px-[35px] text-2xl",
  "5xl": "h-[61px] px-[35px] text-[32px]",
  "4xl": "h-[56px] px-[35px] text-2xl",
  "6xl": "h-[73px] px-[11px] text-2xl",
  sm: "h-[32px] px-[35px] text-base",
  "2xl": "h-[46px] px-[35px] text-xl",
  md: "h-[40px] px-3.5",
  "3xl": "h-[48px] px-1.5",
  lg: "h-[40px] px-[17px] text-base",
  xs: "h-[27px] px-[17px] text-sm",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "gray_300",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["xl", "7xl", "5xl", "4xl", "6xl", "sm", "2xl", "md", "3xl", "lg", "xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["white_A700", "gray_50", "light_blue_800", "blue_600", "gray_300"]),
};

export { Button };
