import React from "react";

const sizes = {
  xs: "text-xs font-normal",
  lg: "text-base font-normal",
  s: "text-sm font-normal",
  "2xl": "text-xl font-normal",
  "3xl": "text-2xl font-normal md:text-[22px]",
  "4xl": "text-3xl font-normal md:text-[28px] sm:text-[26px]",
  xl: "text-lg font-normal",
  md: "text-[15px] font-normal",
};

const Text = ({ children, className = "", as, size = "lg", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900 font-dmsans ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
