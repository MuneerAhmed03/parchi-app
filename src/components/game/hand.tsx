import React, { FC, useState } from "react";
import ParchiSvg from "@/components/parchi-svg";

interface HandProps {
  hand: { title: string; id: string }[];
  isTurn: boolean;
  handlePass?: (message: any) => void;
}

export const Hand: FC<HandProps> = ({ hand, isTurn, handlePass }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    if (!isTurn) return;
    setSelectedCard(selectedCard === id ? null : id);
  };

  const handlePassClick = () => {
    if (handlePass && selectedCard) {
      handlePass({
        type: "pass_card",
        cardId: selectedCard,
      });
      setSelectedCard(null);
    }
  };

  return (
    <div className="relative w-full px-4 py-6">
      <div className="flex justify-center items-center gap-2 md:gap-4 flex-wrap">
        {hand.map((card) => (
          <div
            key={card.id}
            className={`relative cursor-pointer transition-all duration-300 hover:scale-105 
              ${selectedCard === card.id ? "ring-2 ring-black ring-offset-2" : ""}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <span className="text-sm md:text-base font-bold text-gray-800 whitespace-nowrap">
                {card.title}
              </span>
            </div>

            <div className="w-24 md:w-32 h-32 md:h-40">
              <ParchiSvg className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>

      {selectedCard && isTurn && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
          <button
            onClick={handlePassClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full 
              font-bold shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            PASS
          </button>
        </div>
      )}
    </div>
  );
};
