import { useQuery } from '@tanstack/react-query';
import { getUserRankInLeague } from '../api';

export const useUserLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard-user'],
    queryFn: () => getUserRankInLeague(),
    staleTime: 10 * (60 * 1000),
    gcTime: 15 * (60 * 1000),
  });
};
