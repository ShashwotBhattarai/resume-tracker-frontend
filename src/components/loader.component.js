import React from "react";

const Spinner = ({ className }) => {
  return (
    <div className="flex justify-center items-center ">
      <div
        className={`animate-spin rounded-full h-5 w-5 border-t-2 border-black ${className}`}
      ></div>
    </div>
  );
};

export default Spinner;
