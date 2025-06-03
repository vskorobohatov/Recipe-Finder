import React from "react";

export default function ContentWrapper({
  children,
  className: additionalClasses,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`w-full flex items-stretch flex-col gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4 ${additionalClasses}`}
    >
      {children}
    </div>
  );
}
