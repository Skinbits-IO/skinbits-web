interface LightingProps {
  left: string;
  top: string;
}

export const Lighting = (props: LightingProps) => {
  return (
    <div
      style={{
        left: props.left,
        top: props.top,
        position: 'absolute',
        zIndex: 0,
        height: '4rem',
        width: '4rem',
        background:
          'conic-gradient(from 90deg at 50% 50%, #B6D0F7 0deg, #C5C1F9 72deg, #FAFCFE 144deg, #BFF6F9 216deg, #CCBAE4 288deg, #B6D0F7 360deg)',
        filter: ' blur(4.6875rem)',
      }}
    />
  );
};
