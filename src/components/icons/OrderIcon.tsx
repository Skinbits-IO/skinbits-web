import * as React from 'react';

export interface OrderIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  opacity?: number;
}

export const OrderIcon = ({
  size = 24,
  color = '#FFFFFF',
  opacity = 0.5,
  ...props
}: OrderIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="m8 8 3.293-3.293a1 1 0 0 1 1.414 0L16 8m-4-3v14"
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </svg>
);
