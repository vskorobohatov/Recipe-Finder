import React from "react";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const Title: React.FC<TitleProps> = ({
  children,
  className: additionalClasses,
}) => (
  <h1 className={`text-2xl sm:text-3xl font-bold text-center ${additionalClasses}`}>
    {children}
  </h1>
);

export default Title;
