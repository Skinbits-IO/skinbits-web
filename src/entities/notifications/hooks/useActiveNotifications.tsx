import { useInfiniteQuery } from '@tanstack/react-query';
import { getActiveNotifications } from '../api';

export function useActiveNotifications(limit = 10) {
  const query = useInfiniteQuery({
    queryKey: ['notifications', limit],
    queryFn: ({ pageParam = 1 }) => getActiveNotifications(pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.pagination?.page || 1;
      const total = lastPage?.pagination?.total_pages || 1;
      return current < total ? current + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // flatten all notifications into one array
  const notifications =
    query.data?.pages.flatMap((page) => page.notifications) ?? [];

  return {
    notifications,
    unreadCount: query.data?.pages?.[0]?.unreadCount ?? 0,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
  };
}
