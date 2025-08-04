import * as React from 'react';

export interface ExchangeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  opacity?: number;
}

export const ExchangeIcon = ({
  size = 25,
  color = '#FFFFFF',
  opacity = 0.4,
  ...props
}: ExchangeIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
  >
    <path
      d="m8.5 19.5-2.293-2.293a1 1 0 0 1 0-1.414L8.5 13.5m-2 3h12m-1-6 2.293-2.293a1 1 0 0 0 0-1.414L17.5 4.5m2 3h-12"
      stroke={color}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeWidth={1.5}
    />
  </svg>
);
