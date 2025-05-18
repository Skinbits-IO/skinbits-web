import * as React from 'react';

interface CheckIconProps {
  size?: number;
  bgColor?: string;
  iconColor?: string;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
  size = 24,
  bgColor = 'rgba(255,255,255,0.2)',
  iconColor = '#fff',
}) => {
  const r = size / 5;
  const strokeWidth = size * 0.083;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
    >
      {/* rounded square background */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        rx={r}
        ry={r}
        fill={bgColor}
      />

      {/* checkmark path */}
      <path
        d={`
          M ${size * 0.28} ${size * 0.52}
          L ${size * 0.45} ${size * 0.68}
          L ${size * 0.75} ${size * 0.35}
        `}
        fill="none"
        stroke={iconColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
