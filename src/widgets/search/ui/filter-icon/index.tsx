interface FilterIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  opacity?: number;
}

export const FilterIcon = ({
  size = 24,
  color = '#FFFFFF',
  opacity = 0.5,
  ...props
}: FilterIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={1.5}
      d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.818a3 3 0 0 1-.807 2.046l-5.655 6.06A2 2 0 0 0 15 14.288v4.094a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 9 20.382v-6.094a2 2 0 0 0-.538-1.364l-5.655-6.06A3 3 0 0 1 2 4.818V4Z"
    />
  </svg>
);
