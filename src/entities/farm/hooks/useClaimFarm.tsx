import { useMutation } from '@tanstack/react-query';
import { claimFarmSession } from '../api';
import { useAppDispatch, useStatusNotification } from '../../../shared';
import { setFarmingSession, setFarmingStatus } from '../model';
import { FarmStatus } from '../types';
import { setUser } from '../../user';

export const useClaimFarm = () => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: () => claimFarmSession(),
    onSuccess: (data) => {
      dispatch(setFarmingSession(null));
      dispatch(setFarmingStatus(FarmStatus.Inactive));
      dispatch(setUser(data));
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to claim farm session',
        3000,
      );
    },
  });
};
