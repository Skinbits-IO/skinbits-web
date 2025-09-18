import { useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { RankEnum } from '../../../shared';
import { getTopUsersByLeague } from '../api';

export const useLeaderboard = (
  league: RankEnum,
  page: number,
  limit: number = 10,
) => {
  const queryKey = ['leaderboard', league, page, limit];

  const query = useQuery({
    queryKey,
    queryFn: () => getTopUsersByLeague(league, page * limit, limit),
    staleTime: Infinity,
    gcTime: 15 * 60 * 1000,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.refetchQueries({ queryKey, exact: true });
  }, [page]);

  return query;
};
