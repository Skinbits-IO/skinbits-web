import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  opacity?: number;
  size?: number;
};

export const TonIcon = ({
  color = '#fff',
  opacity = 1,
  size = 16,
  ...props
}: IconProps) => {
  // original viewBox is 0 0 16 15, so preserve aspect ratio
  const width = size;
  const height = (size * 15) / 16;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 15"
      fill="none"
      style={{ opacity }}
      {...props}
    >
      <path
        fill={color}
        d="M12.782.027H2.67C.825.027-.334 2.028.562 3.66L6.777 14.46a1.084 1.084 0 0 0 1.844 0L14.837 3.66c.948-1.633-.211-3.634-2.055-3.634ZM6.83 11.194 5.46 8.56 2.195 2.713c-.211-.369.052-.843.526-.843h4.11v9.324Zm6.427-8.48L9.99 8.56l-1.37 2.634V1.87h4.109c.474 0 .737.474.527.843Z"
      />
    </svg>
  );
};
