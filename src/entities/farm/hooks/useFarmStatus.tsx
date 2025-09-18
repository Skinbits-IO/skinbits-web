import { useQuery } from '@tanstack/react-query';
import { getFarmingStatus } from '../api';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../shared';
import { setFarmingSession, setFarmingStatus } from '../model';

export const useFarmStatus = () => {
  const dispatch = useAppDispatch();

  const { data, isPending } = useQuery({
    queryKey: ['farming-status'],
    queryFn: () => getFarmingStatus(),
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      dispatch(setFarmingStatus(data.status));
      if (data.session) dispatch(setFarmingSession(data.session));
    }
  }, [data]);

  return { isPending };
};
