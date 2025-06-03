import React from "react";

export default function PageWrapper({
  children,
  className: additionalClasses,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`container mx-auto p-4 max-w-[800px] flex flex-col items-center justify-center min-h-screen ${additionalClasses}`}
    >
      {children}
    </div>
  );
}
