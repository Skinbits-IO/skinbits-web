import { useQuery } from '@tanstack/react-query';
import { checkFarmAvailability, getFarmingStatus } from '../api';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector, useUser } from '../../../shared';
import { setFarmFetched, setFarmingSession, setFarmingStatus } from '../model';
import { FarmStatus } from '../types';

export const useFarmStatus = () => {
  const dispatch = useAppDispatch();
  const { fetched } = useAppSelector((state) => state.farm);
  const { user } = useUser();

  const { data: availableData, isPending: isPendingFarm } = useQuery({
    queryKey: ['farm-availability'],
    queryFn: () => checkFarmAvailability(),
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const { data: claimData, isPending: isPendingClaim } = useQuery({
    queryKey: ['farming-status'],
    queryFn: () => getFarmingStatus(),
    retry: 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (fetched) return;
    if (availableData && claimData) dispatch(setFarmFetched(true));

    if (availableData) {
      dispatch(setFarmingStatus(FarmStatus.Inactive));
    } else if (!availableData && user!.farmLevel !== 0) {
      dispatch(setFarmingStatus(FarmStatus.Active));
    }

    if (claimData) {
      if (claimData.canClaim) dispatch(setFarmingStatus(FarmStatus.Claim));
      if (claimData.session) dispatch(setFarmingSession(claimData.session));
    }
  }, [fetched, claimData, availableData]);

  return { isPendingFarm, isPendingClaim };
};
