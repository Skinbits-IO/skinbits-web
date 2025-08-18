import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  opacity?: number;
  size?: number;
};

export const StarIcon = ({
  color = 'currentColor',
  opacity = 1,
  size = 18,
  ...props
}: IconProps) => {
  // preserve the original aspect ratio (18×15)
  const width = size;
  const height = (size * 15) / 18;
  // generate unique IDs so multiple icons don't clash
  const id = React.useId();
  const maskId = `star-mask-${id}`;
  const patternId = `star-pattern-${id}`;
  const imageId = `star-image-${id}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 15"
      fill="none"
      style={{ opacity, color }}
      {...props}
    >
      <defs>
        <mask
          id={maskId}
          x={0}
          y={0}
          width={18}
          height={15}
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'alpha' }}
        >
          <path fill={`url(#${patternId})`} d="M.572.125h16.856v14.749H.572z" />
        </mask>
        <pattern
          id={patternId}
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use xlinkHref={`#${imageId}`} transform="scale(.01 .01143)" />
        </pattern>
        <image
          id={imageId}
          width={100}
          height={100}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>

      <g mask={`url(#${maskId})`}>
        <rect width={18} height={15} fill={color} />
      </g>
    </svg>
  );
};
