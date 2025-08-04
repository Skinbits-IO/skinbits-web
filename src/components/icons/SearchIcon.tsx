import * as React from 'react';

export interface SearchIconProps extends React.SVGProps<SVGSVGElement> {
  /** Width & height in px */
  size?: number;
  /** Stroke color */
  color?: string;
  /** Stroke opacity */
  opacity?: number;
}

export const SearchIcon = ({
  size = 17,
  color = '#FAFAFA',
  opacity = 0.6,
  ...props
}: SearchIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 18) / 17}
    viewBox="0 0 17 18"
    fill="none"
    {...props}
  >
    <circle
      cx={7.792}
      cy={8.292}
      r={5.667}
      stroke={color}
      strokeWidth={1.063}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      stroke={color}
      strokeWidth={1.063}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.688 12.512l3.541 3.542"
    />
  </svg>
);
