import React from "react";

export const metadata = {
  title: "404 Page Not Found",
  description: "404 - Page Not Found",
};

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl text-gray-500   ">404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;
