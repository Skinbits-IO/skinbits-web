import * as React from 'react';

interface StepBackgroundProps extends React.SVGProps<SVGSVGElement> {
  size?: {
    width: number;
    height: number;
  };
}

export const StepBackground: React.FC<StepBackgroundProps> = ({
  size = { width: 281, height: 243 },
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size.width}
    height={size.height}
    fill="none"
    viewBox={`0 0 ${size.width} ${size.height}`}
    {...props}
  >
    {/* ---------- Outer Connector Path (light stroke) ---------- */}
    <path
      className="outerPipe"
      stroke="#fff"
      strokeOpacity={0.1}
      d="M86.5 5.903H264c8.837 0 16 7.163 16 16v84.089c0 8.836-7.163 16-16 16H17c-8.837 0-16 7.163-16 16v84.089c0 8.837 7.163 16 16 16h69.5"
    />

    {/* ---------- Mask Definition (for clipping the three blurred rectangles) ---------- */}
    <mask
      id="stepMask"
      width={281}
      height={234}
      x={0}
      y={5}
      maskUnits="userSpaceOnUse"
      style={{ maskType: 'alpha' }}
    >
      <path
        className="maskPipe"
        stroke="#fff"
        strokeOpacity={1}
        d="M86.5 5.903H264c8.837 0 16 7.163 16 16v84.089c0 8.836-7.163 16-16 16H17c-8.837 0-16 7.163-16 16v84.089c0 8.837 7.163 16 16 16h69.5"
      />
    </mask>

    {/* ---------- Group of Three Blurred Rectangles (using filters) ---------- */}
    <g mask="url(#stepMask)">
      {/* First blurred rectangle */}
      <g filter="url(#blurFilter1)">
        <rect
          className="stepRect1"
          x={26}
          y={72.802}
          width={65}
          height={98.381}
          fill="#D9D9D9"
        />
      </g>

      {/* Second blurred rectangle */}
      <g filter="url(#blurFilter2)">
        <rect
          className="stepRect2"
          x={88}
          y={-42.304}
          width={65}
          height={98.381}
          fill="#D9D9D9"
        />
      </g>

      {/* Third blurred rectangle */}
      <g filter="url(#blurFilter3)">
        <rect
          className="stepRect3"
          x={30}
          y={188.891}
          width={55}
          height={98.381}
          fill="#D9D9D9"
        />
      </g>
    </g>

    {/* ---------- Three “circle” endpoints to denote joints ---------- */}
    <ellipse
      className="circleJoint1_outer"
      cx={26}
      cy={121.992}
      rx={6}
      ry={5.903}
      fill="#D9D9D9"
      fillOpacity={0.4}
    />
    <ellipse
      className="circleJoint1_inner"
      cx={26}
      cy={121.992}
      rx={4}
      ry={3.935}
      fill="#D9D9D9"
    />

    <ellipse
      className="circleJoint2_outer"
      cx={88}
      cy={5.903}
      rx={6}
      ry={5.903}
      fill="#D9D9D9"
      fillOpacity={0.4}
    />
    <ellipse
      className="circleJoint2_inner"
      cx={88}
      cy={5.903}
      rx={4}
      ry={3.935}
      fill="#D9D9D9"
    />

    <ellipse
      className="circleJoint3_outer"
      cx={85}
      cy={237.097}
      rx={6}
      ry={5.903}
      fill="#D9D9D9"
      fillOpacity={0.4}
    />
    <ellipse
      className="circleJoint3_inner"
      cx={85}
      cy={237.097}
      rx={4}
      ry={3.935}
      fill="#D9D9D9"
    />

    {/* ---------- Filters for Gaussian Blur ---------- */}
    <defs>
      <filter
        id="blurFilter1"
        x={-9.7}
        y={37.102}
        width={136.4}
        height={169.781}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={17.85} result="blur1" />
      </filter>

      <filter
        id="blurFilter2"
        x={52.3}
        y={-78.004}
        width={136.4}
        height={169.781}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={17.85} result="blur2" />
      </filter>

      <filter
        id="blurFilter3"
        x={-5.7}
        y={153.191}
        width={126.4}
        height={169.781}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation={17.85} result="blur3" />
      </filter>
    </defs>
  </svg>
);
