import { FC } from "react";
import ParchiSvg from "../parchi-svg";

interface ParchiProps {
  playerId: number;
  selectedPlayer: number | null;
  setSelectedPlayer: (id: number | null) => void;
}

interface ParchiProp {}

const Parchi: FC<ParchiProps> = ({
  playerId,
  selectedPlayer,
  setSelectedPlayer,
}) => {
  const isSelected = selectedPlayer === playerId;

  return (
    <div
      className={`relative w-fit group hover:cursor-pointer transition-transform duration-500 hover:rotate-6 hover:-translate-y-2 hover:scale-110 ease-in-out hover:cursor lg:h-48 mr-2 ${isSelected && "border-2 border-black"}`}
      onClick={() => setSelectedPlayer(playerId)}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2 py-1">
        <span className="text-[10px] font-bold text-gray-700 group-hover:text-base transition-all duration-300">
          Raja
        </span>
      </div>

      <ParchiSvg className="w-full h-full " />

      {isSelected && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out">
          <button
            className="bg-green-500 text-white border text-sm border-black font-bold py-1 px-3 md:text-xl rounded shadow-lg tracking-wide animate-bounce"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPlayer(null);
            }}
          >
            Pass
          </button>
        </div>
      )}
    </div>
  );
};

export default Parchi;
