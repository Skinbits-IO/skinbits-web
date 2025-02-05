interface ArrowIconProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const ArrowIcon = ({
  size = 25,
  color = '#AAAAAA',
  opacity = 1,
  ...props
}: ArrowIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 10) / 14}
    viewBox="0 0 14 10"
    {...props}
  >
    <path
      stroke={color}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m9 9 3.293-3.293a1 1 0 0 0 0-1.414L9 1M12.5 5h-11"
    />
  </svg>
);
