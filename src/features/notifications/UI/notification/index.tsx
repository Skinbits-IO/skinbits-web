import { NotificationCircle } from '../../../../components';
import { Notification as NotificationType } from '../../../../shared';
import { getTimeDifferenceString } from '../../utils';
import styles from './Notification.module.css';

interface INotificationProps {
  notification: NotificationType;
}

export const Notification = ({ notification }: INotificationProps) => {
  const deliveryTime = getTimeDifferenceString(notification.createdAt);

  return (
    <div className={styles.background}>
      <div className={styles.applicationRow}>
        <NotificationCircle />
        <h6>{notification.type}</h6>
        <h6 style={{ color: '#A8A8A8' }}>{deliveryTime}</h6>
      </div>
      <h5 className={styles.title}>{notification.name}</h5>
      <p className={styles.description}>{notification.content}</p>
      {notification.picUrl && (
        <img
          src={notification.picUrl}
          alt="Notification Image"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              window.location.origin + '/skinbits-web/avatar.jpg';
          }}
        />
      )}
    </div>
  );
};
