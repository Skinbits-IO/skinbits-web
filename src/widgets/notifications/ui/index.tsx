import styles from './index.module.css';
import { useActiveNotifications } from '../hooks';
import { setNotificationShow } from '../model';
import {
  LoadMore,
  Popup,
  useAppDispatch,
  useAppSelector,
} from '../../../shared';
import { Notification } from './notification';

export const NotificationWidget = () => {
  const dispatch = useAppDispatch();
  const { notifications } = useAppSelector((state) => state.notification);

  const { isLoading, isError, isFetching, hasMore, loadMore } =
    useActiveNotifications(5);

  return (
    <Popup onClose={() => dispatch(setNotificationShow(false))}>
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
    </Popup>
  );
};
