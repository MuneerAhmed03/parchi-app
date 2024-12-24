import React from 'react';

interface CrayonAvatarProps {
  name: string;
  isActive?: boolean;
  className?: string;
}

export function CrayonAvatar({ name, isActive = false, className = '' }: CrayonAvatarProps) {
  // Generate a consistent color based on name
  const hue = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  
  return (
    <div 
      className={`relative ${className}`}
      role="img"
      aria-label={`${name}'s avatar`}
    >
      <svg
        viewBox="0 0 100 100"
        className={`
          w-full 
          h-full 
          transition-transform 
          duration-300
          ${isActive ? 'scale-110' : 'scale-100'}
        `}
      >
        {/* Background circle with wobble effect */}
        <path
          d={`
            M 50,50 
            m -45,0 
            a 43,45 0 1,0 90,0 
            a 45,43 0 1,0 -90,0
          `}
          fill={`hsl(${hue}, 70%, 85%)`}
          stroke={`hsl(${hue}, 60%, 60%)`}
          strokeWidth="3"
          strokeLinecap="round"
          className="origin-center animate-[spin_10s_linear_infinite]"
        />

        {/* Crayon-style face elements */}
        <g stroke={`hsl(${hue}, 40%, 40%)`} strokeWidth="2.5" strokeLinecap="round" fill="none">
          {/* Wobbly smile */}
          <path
            d={`
              M 35,60 
              Q 50,${isActive ? '75' : '70'} 65,60
            `}
            className="transition-all duration-300"
          />
          
          {/* Left eye */}
          <path
            d={`
              M 35,40 
              q 3,-2 6,0
              m -3,-3
              q -2,3 0,6
            `}
          />
          
          {/* Right eye */}
          <path
            d={`
              M 59,40 
              q 3,-2 6,0
              m -3,-3
              q -2,3 0,6
            `}
          />
        </g>

        {/* Scribble overlay for texture */}
        <g stroke={`hsl(${hue}, 60%, 75%)`} strokeWidth="1" opacity="0.3">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`
                M ${20 + Math.random() * 60},${20 + Math.random() * 60} 
                q ${Math.random() * 20 - 10},${Math.random() * 20 - 10} 
                  ${Math.random() * 20 - 10},${Math.random() * 20 - 10}
              `}
            />
          ))}
        </g>
      </svg>

      {/* Active state glow effect */}
      {isActive && (
        <div 
          className="
            absolute 
            inset-0 
            rounded-full 
            animate-pulse
          "
          style={{
            boxShadow: `0 0 20px hsl(${hue}, 70%, 70%)`,
          }}
        />
      )}
    </div>
  );
}