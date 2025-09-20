import { LoadMore, Popup } from '../../../shared';
import { useActiveNotifications } from '../../../entities';
import { NotificationCard } from './notification-card';

interface INotificationPopupProps {
  onClose: () => void;
}

export const NotificationPopup = ({ onClose }: INotificationPopupProps) => {
  const { data, isLoading, isError, isFetching, hasMore, loadMore } =
    useActiveNotifications(5);

  return (
    <Popup onClose={onClose}>
      {isLoading && (
        <div className="h-[50vh] w-full flex items-center justify-center text-sm text-white/70 font-medium bg-transparent">
          Loading…
        </div>
      )}

      {isError && (
        <div className="h-[50vh] w-full flex items-center justify-center text-sm text-white/70 font-medium bg-transparent">
          Failed to load.
        </div>
      )}

      {!isLoading && data.notifications.length === 0 && (
        <div className="h-[50vh] w-full flex items-center justify-center text-sm text-white/70 font-medium bg-transparent">
          No notifications
        </div>
      )}

      <div className=" h-full flex flex-col items-center justify-start gap-[15px] overflow-y-auto scrollbar">
        {data.notifications.map((notification, idx) => (
          <NotificationCard key={idx} notification={notification} />
        ))}

        {hasMore && <LoadMore isPending={isFetching} onClick={loadMore} />}
      </div>
    </Popup>
  );
};
