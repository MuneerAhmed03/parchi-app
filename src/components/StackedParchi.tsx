import React from 'react';
import PaperChit from '@/components/Parchi';

const StackedPaperChits = ({ count = 5 }) => {
  return (
    <div className="relative w-full h-full">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            transform: index === count - 1 ? 'none' : `rotate(${-4 + 3 * index}deg)`,
            zIndex: index,
          }}
        >
          <PaperChit className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default StackedPaperChits;
