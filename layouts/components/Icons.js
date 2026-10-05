// small stroke icons shared by the redesigned sections

export const ArrowIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M1.5 7h10.5M8 3l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
    />
  </svg>
);

export const ArrowDownIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M7 1.5v10.5M3 8l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
    />
  </svg>
);

export const RowsIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M2 3.5h12M2 8h12M2 12.5h12"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);

export const GridIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const PlayIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const LockIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect
      x="3"
      y="7"
      width="10"
      height="7"
      rx="1.5"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);
