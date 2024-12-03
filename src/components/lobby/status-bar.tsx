import React from "react";

// Define the prop types
interface StatusBarProps {
  playersReady: number; // playersReady should be a number
}

const StatusBar: React.FC<StatusBarProps> = ({ playersReady }) => {
  // Ensure playersReady is between 0 and 4
  const progress = Math.min(Math.max(playersReady, 0), 4);

  return (
    <div className="text-center font-pencil tracking-wide md:text-base text-sm flex flex-col gap-1 font-bold text-black">
      <div>{`${playersReady}/4 Players Ready`}</div>
      {/* Progress Bar */}
      <div className="h-3 md:h-5 max-w-[330px] w-full bg-white border-2 border-black mx-auto rounded-full my-1">
        <div
          className="h-full bg-green-400 rounded-full"
          style={{ width: `${(progress / 4) * 100}%` }}
        ></div>
      </div>
      <div>{progress === 4 ? "All players are ready!" : "Waiting for everyone to get ready!"}</div>
    </div>
  );
};

export default StatusBar;
