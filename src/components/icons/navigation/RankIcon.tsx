import { SVGProps } from 'react';

interface RankIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export const RankIcon = ({ className, ...props }: RankIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className={className}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M1.25 7A5.75 5.75 0 0 1 7 1.25h10A5.75 5.75 0 0 1 22.75 7v10A5.75 5.75 0 0 1 17 22.75H7A5.75 5.75 0 0 1 1.25 17V7Zm6 10a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0v3Zm4.75.75a.75.75 0 0 1-.75-.75V7a.75.75 0 0 1 1.5 0v10a.75.75 0 0 1-.75.75Zm3.25-.75a.75.75 0 0 0 1.5 0v-7a.75.75 0 0 0-1.5 0v7Z"
      clipRule="evenodd"
    />
  </svg>
);
