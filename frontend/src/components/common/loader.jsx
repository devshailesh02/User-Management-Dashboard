import React from "react";
import loaderImage from "../../assets/hero.png";

const Loader = ({ fullScreen = true }) => {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm"
          : "flex w-full items-center justify-center py-10"
      }
    >
      <img
        src={loaderImage}
        alt="Loading"
        className="h-32 w-32 animate-loader object-contain select-none"
        draggable={false}
      />
    </div>
  );
};

export default Loader;
