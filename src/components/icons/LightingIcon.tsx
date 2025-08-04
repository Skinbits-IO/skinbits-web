type SvgComponentProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  size?: number;
};

export const LightingIcon = ({
  color = '#000',
  strokeColor = '#000',
  strokeWidth = 1.398,
  size = 14,
  ...props
}: SvgComponentProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 20) / 14} // Maintain aspect ratio
    fill="none"
    {...props}
  >
    <path
      fill={color}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      d="M8.453 8.71a.186.186 0 0 1-.187-.186V1.426a.186.186 0 0 0-.336-.111L.792 10.909a.466.466 0 0 0 .374.744h3.903c.103 0 .187.083.187.186v7.098c0 .18.229.255.336.111l7.138-9.593a.466.466 0 0 0-.374-.745H8.453Z"
    />
  </svg>
);
