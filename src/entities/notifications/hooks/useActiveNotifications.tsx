import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getActiveNotifications } from '../api';

export function useActiveNotifications(limit = 10) {
  const [page, setPage] = useState(0);
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const skip = page * limit;

  const {
    data = { notifications: [], unreadCount: 0 },
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['notifications', skip, limit],
    queryFn: () => getActiveNotifications(skip, limit),
    staleTime: Infinity,
    gcTime: 15 * (60 * 1000),
  });

  const hasMore = data.notifications.length === limit;

  function loadMore() {
    if (!isFetching && hasMore) {
      setPage((p) => p + 1);
    }
  }

  useEffect(() => {
    setHasUnread(data.unreadCount !== 0);
  }, [data]);

  return {
    data,
    isLoading,
    isError,
    isFetching,
    hasMore,
    loadMore,
    hasUnread,
  };
}
