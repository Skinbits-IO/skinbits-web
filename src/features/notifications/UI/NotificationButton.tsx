import { NotificationIcon } from '../../../components';

export const NotificationButton = () => {
  return (
    <button
      style={{
        height: '49px',
        width: '49px',
        border: '2px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24.5px',
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NotificationIcon size={24} color="#8A8A8A" />
    </button>
  );
};
