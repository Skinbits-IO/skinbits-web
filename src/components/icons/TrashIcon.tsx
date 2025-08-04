import * as React from 'react';

export interface TrashIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  opacity?: number;
}

export const TrashIcon = ({
  size = 25,
  color = '#C1575A',
  opacity = 1,
  ...props
}: TrashIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 25 25"
    fill="none"
    {...props}
    style={{ opacity }}
  >
    <path
      d="M5.55 9.234C4.707 8.108 5.51 6.5 6.919 6.5h11.164c1.409 0 2.212 1.608 1.367 2.734a4.746 4.746 0 0 0-.949 2.848V18.5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-6.418a4.747 4.747 0 0 0-.95-2.848Z"
      stroke={color}
      strokeWidth={1.5}
    />
    <path
      d="M14.5 17.5v-6M10.5 17.5v-6"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="m16.5 6.5-.544-1.632A2 2 0 0 0 14.059 3.5h-3.117a2 2 0 0 0-1.898 1.368L8.5 6.5"
      stroke={color}
      strokeLinecap="round"
      strokeWidth={1.5}
    />
  </svg>
);
