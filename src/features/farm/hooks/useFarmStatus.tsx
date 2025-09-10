import { useQuery } from '@tanstack/react-query';
import { getFarmingStatus } from '../api';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared';
import { setFarmingStatus } from '../model';
import { FarmStatus } from '../types';

export const useFarmStatus = () => {
  const dispatch = useAppDispatch();
  const { fetched } = useAppSelector((state) => state.farm);

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
    dispatch(setFarmingStatus(FarmStatus.Inactive));
    /*if (availableData && claimData) dispatch(setFarmFetched(true));

    if (availableData) {
      dispatch(setFarmingStatus(FarmStatus.Inactive));
    } else if (!availableData && user!.farmLevel !== 0) {
      dispatch(setFarmingStatus(FarmStatus.Active));
    }

    if (claimData) {
      if (claimData.canClaim) dispatch(setFarmingStatus(FarmStatus.Claim));
      if (claimData.session) dispatch(setFarmingSession(claimData.session));
      }*/
  }, [fetched, claimData]);

  return { isPendingClaim };
};
