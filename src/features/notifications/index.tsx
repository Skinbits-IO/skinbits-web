import { motion } from 'framer-motion';
import styles from './NotificationWidget.module.css';
import { AppDispatch, RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { setNotificationShow } from '../../store/slices/notificationSlice';
import { LoadMore, PopupCloseButton } from '../../components';
import { Notification } from './UI';
import { useActiveNotifications } from './hooks';
import { useSelector } from 'react-redux';

export const NotificationWidget = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications } = useSelector(
    (state: RootState) => state.notification
  );

  const { isLoading, isError, isFetching, hasMore, loadMore } =
    useActiveNotifications(5);

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => dispatch(setNotificationShow(false))}
      />
      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <PopupCloseButton onTap={() => dispatch(setNotificationShow(false))} />

        {isLoading && <div className={styles.empty}>Loading…</div>}
        {isError && <div className={styles.empty}>Failed to load.</div>}

        {!isLoading && notifications.length === 0 && (
          <div className={styles.empty}>No notifications</div>
        )}

        <div className={styles.notifications}>
          {notifications.map((notification, idx) => (
            <Notification key={idx} notification={notification} />
          ))}

          {hasMore && <LoadMore isPending={isFetching} onClick={loadMore} />}
        </div>
      </motion.div>
    </>
  );
};
