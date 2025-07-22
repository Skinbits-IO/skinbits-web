import { useQuery } from '@tanstack/react-query';
import { getTopUsersByLeague } from '../api';
import { Rank } from '../../../shared';

export const useLeaderboard = (league: Rank) => {
  return useQuery({
    queryKey: ['leaderboard-top', league],
    queryFn: () => getTopUsersByLeague(league),
    staleTime: Infinity,
    gcTime: 15 * (60 * 1000),
  });
};
