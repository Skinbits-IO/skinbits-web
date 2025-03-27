import { motion } from 'framer-motion';
import styles from './NotificationWidget.module.css';
import { PopupCloseButton } from '../../components';
import { CustomNotification } from '../../types';
import { Notification } from './UI/notification';

interface INotificatioWidgetProps {
  onClose: () => void;
}

export const NotificationWidget = ({ onClose }: INotificatioWidgetProps) => {
  const notifications: CustomNotification[] = [
    {
      type: 'Application name',
      datetime: Date.now(),
      title: 'Test notification',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
      imageUrl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhatrabbits.com%2Fen%2Frandom-image%2F&psig=AOvVaw0rYzAO8hon86lLz3cE4F-L&ust=1743194780226000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjVoN-Qq4wDFQAAAAAdAAAAABAE',
    },
    {
      type: 'Application name',
      datetime: Date.now() - 600000,
      title: 'Test notification',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor',
      imageUrl:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fhatrabbits.com%2Fen%2Frandom-image%2F&psig=AOvVaw0rYzAO8hon86lLz3cE4F-L&ust=1743194780226000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNjVoN-Qq4wDFQAAAAAdAAAAABAE',
    },
  ];

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      ></motion.div>
      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <PopupCloseButton onTap={onClose} />
        {notifications.length === 0 && (
          <div className={styles.empty}>No notifications</div>
        )}
        <div className={styles.notifications}>
          {notifications.length !== 0 &&
            notifications.map((notification, key) => {
              return (
                <Notification
                  key={`${key}-notification`}
                  notification={notification}
                />
              );
            })}
        </div>
      </motion.div>
    </>
  );
};
