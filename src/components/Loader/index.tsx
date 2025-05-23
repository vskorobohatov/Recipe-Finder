import React from "react";

const Loader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen w-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
  </div>
);

export default Loader;