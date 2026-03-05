interface RadarIconProps {
  className?: string;
  size?: number;
}

export function RadarIcon({ className = '', size = 20 }: RadarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer triangle */}
      <path
        d="M12 2L22 20H2L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cyan-400"
      />

      {/* Inner triangle */}
      <path
        d="M12 6L18 16H6L12 6Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-cyan-300"
      />

      {/* Radar sweep arcs */}
      <path
        d="M12 6C15.866 6 19 9.134 19 13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="text-cyan-500 animate-pulse"
        strokeDasharray="2,2"
      />

      <path
        d="M12 8C14.7614 8 17 10.2386 17 13"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        className="text-cyan-400"
        strokeDasharray="1,1"
      />

      {/* Center dot */}
      <circle
        cx="12"
        cy="13"
        r="1.5"
        fill="currentColor"
        className="text-cyan-300 animate-pulse"
      />

      {/* Aircraft detection dots */}
      <circle
        cx="16"
        cy="10"
        r="0.8"
        fill="currentColor"
        className="text-cyan-200 animate-ping"
      />

      <circle
        cx="8"
        cy="12"
        r="0.6"
        fill="currentColor"
        className="text-cyan-200"
      />
    </svg>
  );
}