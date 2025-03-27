import { NotificationIcon } from '../icons/NotificationIcon';
import styles from './NotificationButton.module.css';

interface INotificationButtonProps {
  hasUnreadMessages?: boolean;
  onTap: () => void;
}

export const NotificationButton = ({
  hasUnreadMessages = true,
  onTap,
}: INotificationButtonProps) => {
  return (
    <button className={styles.button} onClick={() => onTap()}>
      {hasUnreadMessages && <div className={styles.circle} />}
      <NotificationIcon size={24} color="#8A8A8A" />
    </button>
  );
};
