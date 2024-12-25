import React from "react";

const PaperChit = ({ className = "", rotate = false }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 150 200"
    preserveAspectRatio="xMidYMid meet"
    style={{
      transform: rotate ? "rotate(180deg)" : "none",
      transition: "transform 0.3s ease",
    }}
  >
    <rect width="100%" height="100%" fill="none" />

    <path
      d="M20 15
         L30 15
         L120 15
         L130 15
         Q132 30, 130 50
         Q128 70, 130 90
         Q132 110, 130 130
         Q128 150, 130 170
         L130 185
         L120 185
         L30 185
         L20 185
         Q18 170, 20 150
         Q22 130, 20 110
         Q18 90, 20 70
         Q22 50, 20 30
         Z"
      fill="#ffffff"
      stroke="#d3d3d3"
      strokeWidth="1"
    />

    <defs>
      <linearGradient id="horizontalFold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" style={{ stopColor: "#d0d0d0", stopOpacity: 0.1 }} />
        <stop offset="50%" style={{ stopColor: "#b0b0b0", stopOpacity: 0.3 }} />
        <stop
          offset="100%"
          style={{ stopColor: "#d0d0d0", stopOpacity: 0.1 }}
        />
      </linearGradient>
    </defs>
    <rect x="38" y="99" width="75" height="1" fill="url(#horizontalFold)" />

    <defs>
      <linearGradient id="verticalFold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: "#d0d0d0", stopOpacity: 0.1 }} />
        <stop offset="50%" style={{ stopColor: "#b0b0b0", stopOpacity: 0.3 }} />
        <stop
          offset="100%"
          style={{ stopColor: "#d0d0d0", stopOpacity: 0.1 }}
        />
      </linearGradient>
    </defs>
    <rect x="74" y="30" width="1" height="145" fill="url(#verticalFold)" />

    <path
      d="M22 17
         L32 17
         L118 17
         L128 17
         Q130 32, 128 52
         Q126 72, 128 92
         Q130 112, 128 132
         Q126 152, 128 172
         L128 187
         L118 187
         L32 187
         L22 187
         Q20 172, 22 152
         Q24 132, 22 112
         Q20 92, 22 72
         Q24 52, 22 32
         Z"
      fill="none"
      stroke="rgba(0, 0, 0, 0.1)"
      strokeWidth="3"
    />
  </svg>
);

export default PaperChit;
