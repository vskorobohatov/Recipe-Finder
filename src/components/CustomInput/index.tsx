import React from "react";

const CustomInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props,
) => (
  <input
    className="flex-1 border border-gray-300 rounded p-2 h-10 focus:outline-none focus:border-blue-500 transition duration-300 bg-white dark:bg-gray-800"
    {...props}
  />
);

export default CustomInput;
