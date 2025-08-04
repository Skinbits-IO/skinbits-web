import * as React from 'react';

export const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill="none"
    {...props}
  >
    <path
      fill="#9E9E9E"
      d="M8.385 19A3.752 3.752 0 0 0 12 21.75h4A3.75 3.75 0 0 0 19.75 18v-8A3.752 3.752 0 0 0 17 6.385V14a5 5 0 0 1-5 5H8.385Z"
    />
    <path
      fill="#9E9E9E"
      d="M8 2.25A3.75 3.75 0 0 0 4.25 6v8A3.75 3.75 0 0 0 8 17.75h4A3.75 3.75 0 0 0 15.75 14V6A3.75 3.75 0 0 0 12 2.25H8Z"
    />
  </svg>
);

export default CopyIcon;
