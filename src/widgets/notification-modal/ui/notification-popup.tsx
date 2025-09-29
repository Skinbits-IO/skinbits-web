import { Popup } from '../../../shared';
import { useActiveNotifications } from '../../../entities';
import { NotificationCard } from './notification-card';
import { useEffect, useRef } from 'react';
import { NotificationCardSkeleton } from './notification-card-skeleton';

interface INotificationPopupProps {
  onClose: () => void;
  limit?: number;
}

export const NotificationPopup = ({
  onClose,
  limit = 5,
}: INotificationPopupProps) => {
  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useActiveNotifications(limit);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    // Find nearest scrollable ancestor
    let root: HTMLElement | null = loadMoreRef.current.parentElement;
    const isScrollable = (el: Element) => {
      const s = getComputedStyle(el);
      return /(auto|scroll)/.test(s.overflowY);
    };
    while (root && !isScrollable(root)) root = root.parentElement;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: root ?? null,
        rootMargin: '200px 0px',
        threshold: 0,
      },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Popup onClose={onClose}>
      <div className="h-full w-full flex flex-col items-center justify-start gap-[15px] overflow-y-auto scrollbar">
        {isPending ? (
          Array.from({ length: limit }).map((_, i) => (
            <NotificationCardSkeleton key={i} />
          ))
        ) : notifications.length === 0 ? (
          <div className="h-[50vh] w-full flex items-center justify-center text-sm text-white/70 font-medium bg-transparent">
            No notifications
          </div>
        ) : (
          <>
            {notifications.map((n) => (
              <NotificationCard key={n.id} notification={n} />
            ))}

            <div ref={loadMoreRef} className="h-1 w-full opacity-0" />

            {isFetchingNextPage &&
              Array.from({ length: limit }).map((_, i) => (
                <NotificationCardSkeleton key={`sk-${i}`} />
              ))}
          </>
        )}
      </div>
    </Popup>
  );
};
