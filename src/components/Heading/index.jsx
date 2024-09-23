import React from "react";

const sizes = {
  xl: "text-[100px] font-bold md:text-5xl",
  s: "text-2xl font-semibold md:text-[22px]",
  md: "text-[40px] font-bold md:text-[38px] sm:text-4xl",
  xs: "text-xl font-semibold",
  lg: "text-5xl font-bold md:text-[44px] sm:text-[38px]",
};

const Heading = ({ children, className = "", size = "xs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-black-900 font-inter ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
