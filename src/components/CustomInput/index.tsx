import React from "react";

const CustomInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => (
  <input
    className="border border-gray-300 rounded px-3 py-2 h-10 focus:outline-none focus:border-blue-500 flex-4 transition duration-300"
    {...props}
  />
);

export default CustomInput;
