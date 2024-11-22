import React from "react";
import ParchiSvg from "../parchi-svg";

const Parchi = () => {
  return (
    <div className="relative w-fit h-28 mr-2">
      {/* Title on top */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1">
        <span className="text-[10px] font-bold text-gray-700">Raja</span>
      </div>

      {/* SVG Rendering */}
      <ParchiSvg className="w-full h-full" />
    </div>
  );
};

export default Parchi;
