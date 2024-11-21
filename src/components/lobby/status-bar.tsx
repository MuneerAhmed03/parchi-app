import React from "react";

const StatusBar = () => {
  return (
    <div className="text-center font-pencil tracking-wide flex flex-col gap-1 font-bold text-black">
      <div>1/4 Players Ready</div>
      {/* Progress Bar */}
      <div className="h-5 w-[330px] bg-white border-2 border-black mx-auto rounded-full my-1">
        <div className="h-full bg-green-400 w-1/4 rounded-full"></div>
      </div>
      <div>Waiting For everyone to get ready!</div>
    </div>
  );
};

export default StatusBar;
