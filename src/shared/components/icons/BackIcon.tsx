interface BackIconProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const BackIcon = ({
  size = 19,
  color = '#000',
  opacity = 1,
  ...props
}: BackIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 15) / 19}
    viewBox="0 0 19 15"
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeWidth={2}
      d="M7.008 1.935 2.149 6.793a1 1 0 0 0 0 1.414l4.859 4.858M2.138 7.5h15.304"
    />
  </svg>
);
