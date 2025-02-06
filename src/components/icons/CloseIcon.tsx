interface CloseIconProps {
  size?: number;
  color?: string;
  opacity?: number;
}

export const CloseIcon = ({
  size = 22,
  color = '#FFFFFF',
  opacity = 0.15,
  ...props
}: CloseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      fill={color}
      fillOpacity={opacity}
      fillRule="evenodd"
      d="M6.25 0A5.75 5.75 0 0 0 .5 5.75v10a5.75 5.75 0 0 0 5.75 5.75h10A5.75 5.75 0 0 0 22 15.75v-10A5.75 5.75 0 0 0 16.25 0h-10Zm7.652 8.099a.75.75 0 0 1 0 1.06L12.31 10.75l1.59 1.591a.75.75 0 1 1-1.06 1.06l-1.59-1.59-1.592 1.59a.75.75 0 1 1-1.06-1.06l1.59-1.59L8.6 9.158a.75.75 0 1 1 1.06-1.06l1.591 1.59 1.591-1.59a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);
