import { useQuery } from '@tanstack/react-query';
import { getTopUsersByLeague } from '../api';
import { RankEnum } from '../../../shared';

export const useLeaderboard = (
  league: RankEnum,
  page: number,
  limit: number = 10
) => {
  return useQuery({
    queryKey: ['leaderboard', league, page, limit],
    queryFn: () => getTopUsersByLeague(league, page * limit, limit),
    staleTime: Infinity,
    gcTime: 15 * (60 * 1000),
  });
};
