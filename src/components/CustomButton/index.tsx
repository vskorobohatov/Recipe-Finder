import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className: additionalClasses,
  ...props
}) => (
  <button
    className={`font-semibold px-4 py-2 rounded w-full transition duration-300 ${additionalClasses}`}
    {...props}
  >
    {children}
  </button>
);

export default CustomButton;
