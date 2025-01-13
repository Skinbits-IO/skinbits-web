import { LightingIcon } from '../../../components';

export const UpgradeButton = () => {
  return (
    <button
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '1.25rem',
        height: 'fit-content',
        width: 'fit-content',
        padding: '0.6875rem 0.9375rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.3125rem',
        backgroundColor: '#FBFFE4',
        borderRadius: '2.875rem',
        border: 'none',
      }}
    >
      <h5
        style={{
          fontSize: '1.125rem',
          fontFamily: 'Bebas Neue',
          lineHeight: '1.2',
          margin: '0',
          color: '#000000',
        }}
      >
        Upgrade
      </h5>
      <LightingIcon style={{ verticalAlign: 'middle' }} />
    </button>
  );
};
