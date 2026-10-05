// Patterned papers, rendered once per page (hidden without display:none so
// every inline SVG on the page can reference them).
export const OrigamiDefs = () => (
  <svg
    className="origami-defs"
    width="0"
    height="0"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      {/* the BMDRM lock's own gradients, for the lock gates */}
      <linearGradient
        id="o-lock-shackle"
        x1="42.58"
        y1="71.39"
        x2="42.58"
        y2="0"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4D0097" />
        <stop offset="0.42" stopColor="#6C2ACA" />
        <stop offset="0.78" stopColor="#834AF0" />
        <stop offset="0.98" stopColor="#8C57FF" />
      </linearGradient>
      <linearGradient
        id="o-lock-body"
        x1="42.58"
        y1="106.23"
        x2="42.58"
        y2="21.06"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#AF8BFF" />
        <stop offset="0.2" stopColor="#A075FF" />
        <stop offset="0.42" stopColor="#9464FF" />
        <stop offset="0.67" stopColor="#8E5AFF" />
        <stop offset="0.98" stopColor="#8C57FF" />
      </linearGradient>
      {/* lilac "zebra" paper: surcoats and the horse cloth */}
      <pattern
        id="o-zebra"
        patternUnits="userSpaceOnUse"
        width="26"
        height="26"
        patternTransform="rotate(-28)"
      >
        <rect width="26" height="26" fill="#e3d8fd" />
        <path
          d="M0 5 C6 2 10 9 16 6 S24 3 26 6 L26 10 C20 12 16 8 10 11 S3 12 0 10Z"
          fill="#9a7ff0"
        />
        <path
          d="M0 18 C5 15 11 21 17 18 S23 16 26 18 L26 21 C21 23 15 19 9 22 S3 22 0 21Z"
          fill="#b39cf5"
        />
      </pattern>
      {/* harlequin diamonds: the archer's and the messenger's tunics */}
      <pattern
        id="o-diamond"
        patternUnits="userSpaceOnUse"
        width="12"
        height="16"
      >
        <rect width="12" height="16" fill="#ece5ff" />
        <path d="M6 0 12 8 6 16 0 8Z" fill="#b7a2f2" />
        <path d="M6 3 9 8 6 13 3 8Z" fill="#9a7ff0" />
      </pattern>
      {/* mail */}
      <pattern id="o-scales" patternUnits="userSpaceOnUse" width="8" height="6">
        <rect width="8" height="6" fill="#c6bfd6" />
        <path
          d="M0 6 a4 4 0 0 1 8 0"
          fill="none"
          stroke="#8e86a6"
          strokeWidth="1"
        />
        <path
          d="M-4 3 a4 4 0 0 1 8 0 M4 3 a4 4 0 0 1 8 0"
          fill="none"
          stroke="#a79fbc"
          strokeWidth="1"
        />
      </pattern>
      {/* violet chevrons: the guard's tabard */}
      <pattern id="o-chev" patternUnits="userSpaceOnUse" width="14" height="10">
        <rect width="14" height="10" fill="#4d0097" />
        <path
          d="M0 7.5 L7 2.5 L14 7.5"
          fill="none"
          stroke="#8c57ff"
          strokeWidth="2"
        />
      </pattern>
    </defs>
  </svg>
);
