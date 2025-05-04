import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import styles from './StatusNotifications.module.css';

export const StatusNotifications = () => {
  const { notifications } = useSelector(
    (state: RootState) => state.statusNotifications
  );

  return (
    <AnimatePresence>
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.2 }}
          className={styles.background}
        >
          {notification.type === 'error' && <strong>Error Message: </strong>}
          {notification.text}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};
