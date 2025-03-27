import { image } from 'motion/react-client';
import { NotificationCircle } from '../../../../components';
import { CustomNotification } from '../../../../types';
import { getTimeDifferenceString } from '../../utils/notificationUtils';
import styles from './Notification.module.css';

interface INotificationProps {
  notification: CustomNotification;
}

export const Notification = ({ notification }: INotificationProps) => {
  const deliveryTime = getTimeDifferenceString(notification.datetime);

  return (
    <div className={styles.background}>
      <div className={styles.applicationRow}>
        <NotificationCircle />
        <h6>{notification.type}</h6>
        <h6 style={{ color: '#A8A8A8' }}>{deliveryTime}</h6>
      </div>
      <h5 className={styles.title}>{notification.title}</h5>
      <p className={styles.description}>{notification.description}</p>
      {notification.imageUrl && (
        <img
          src={notification.imageUrl}
          alt="Notification Image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              window.location.origin + '/avatar.jpg';
          }}
        />
      )}
    </div>
  );
};
