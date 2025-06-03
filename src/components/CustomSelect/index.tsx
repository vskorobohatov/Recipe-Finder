import React, { SelectHTMLAttributes, ReactNode } from "react";

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ children, ...props }) => (
  <select
    className="border border-gray-300 rounded px-3 py-2 h-10 focus:outline-none focus:border-blue-500 flex-1 transition duration-300"
    {...props}
  >
    {children}
  </select>
);

export default CustomSelect;
