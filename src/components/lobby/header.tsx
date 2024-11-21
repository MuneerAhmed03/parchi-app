import { CopyIcon } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white w-[500px] mx-auto flex justify-between px-5 py-3 border-2 border-black rounded-xl">
      <div className="font-extrabold text-xl inline-flex gap-2 items-center">
        Room ID: ABCD1234 <CopyIcon className="h-5 w-5 cursor-pointer text-gray-500" />
      </div>
      {/* Button to Leave Room */}
      <button className="bg-red-500 text-white font-bold px-4 py-1 rounded-3xl">Leave Room</button>
    </div>
  );
};

export default Header;
