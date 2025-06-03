import React, { SelectHTMLAttributes, ReactNode } from "react";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ children, ...props }) => (
  <select
    className="flex-1 cursor-pointer border border-gray-300 rounded p-2 h-10 focus:outline-none focus:border-blue-500 transition duration-300 bg-white dark:bg-gray-800"
    {...props}
  >
    {children}
  </select>
);

export default CustomSelect;
