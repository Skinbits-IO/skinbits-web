import { NotificationIcon } from '../../../components';

export const NotificationButton = () => {
  return (
    <button
      style={{
        height: '3.0625rem',
        width: '3.0625rem',
        border: '0.125rem solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1.5313rem',
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
