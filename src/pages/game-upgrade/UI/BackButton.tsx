import { useNavigate } from 'react-router';
import { BackIcon } from '../../../components';

export const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      style={{
        position: 'absolute',
        bottom: '90px',
        height: 'fit-content',
        width: 'fit-content',
        padding: '11px 15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: '#FFFFFF',
        borderRadius: '46px',
        border: 'none',
        zIndex: 1,
      }}
      onClick={() => navigate('/')}
    >
      <BackIcon color="#000000" size={16} />
      <h5
        style={{
          fontSize: '18px',
          fontFamily: 'Bebas Neue',
          lineHeight: 'normal',
          margin: '0',
          color: '#000000',
        }}
      >
        Back
      </h5>
    </button>
  );
};
