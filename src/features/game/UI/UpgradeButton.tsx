import { LightingIcon } from '../../../components';

export const UpgradeButton = () => {
  return (
    <button
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '20px',
        height: 'fit-content',
        width: 'fit-content',
        padding: '11px 15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: '#FBFFE4',
        borderRadius: '46px',
        border: 'none',
      }}
    >
      <h5
        style={{
          fontSize: '18px',
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
