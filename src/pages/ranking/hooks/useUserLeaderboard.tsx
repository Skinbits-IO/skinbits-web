import { useQuery } from '@tanstack/react-query';
import { getUserRankInLeague } from '../api';

export const useUserLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard-user'],
    queryFn: () => getUserRankInLeague(),
    staleTime: Infinity,
    gcTime: 15 * (60 * 1000),
  });
};
