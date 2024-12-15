import { SVGProps } from 'react';

interface MarketplaceIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const MarketplaceIcon = ({ className, ...props }: MarketplaceIconProps) => (
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
      d="M1.265 2.853a.75.75 0 0 1 .882-.589l1.05.21a2.75 2.75 0 0 1 2.197 2.423l.085.853h13.575a3.05 3.05 0 0 1 2.96 3.79l-1.123 4.49a4.25 4.25 0 0 1-4.124 3.22H7.774a2.75 2.75 0 0 1-2.73-2.422l-.99-8.246-.153-1.535a1.25 1.25 0 0 0-.999-1.102l-1.049-.21a.75.75 0 0 1-.588-.882ZM9 12.75a.75.75 0 1 0 0 1.5h4a.75.75 0 0 0 0-1.5H9Z"
      clipRule="evenodd"
    />
    <circle cx={8.5} cy={20} r={1.5} fill="currentColor" />
    <circle cx={17.5} cy={20} r={1.5} fill="currentColor" />
  </svg>
);
export default MarketplaceIcon;
