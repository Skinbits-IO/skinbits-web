import { useInfiniteQuery } from '@tanstack/react-query';
import { RankEnum } from '../../../shared';
import { getTopUsersByLeague } from '../api';
import { RankUser } from '../types';

export const useLeaderboard = (league: RankEnum, limit: number = 10) => {
  const query = useInfiniteQuery({
    queryKey: ['leaderboard', league, limit],
    queryFn: ({ pageParam = 1 }) =>
      getTopUsersByLeague(league, pageParam, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const current = lastPage?.pagination?.page || 1;
      const total = lastPage?.pagination?.total_pages || 1;
      return current < total ? current + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  // flatten all users
  const users: RankUser[] =
    query.data?.pages.flatMap((page) => page.users) ?? [];

  return {
    users,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    isPending: query.isPending,
  };
};
