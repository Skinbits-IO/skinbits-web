import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useStatusNotification } from '../../../shared';
import { startFarmSession } from '../api';
import { setFarmingSession, setFarmingStatus } from '../model';
import { FarmStatus } from '../types';

export const useStartFarm = () => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { startTime: string }) =>
      startFarmSession(data.startTime),
    onSuccess: (data) => {
      dispatch(setFarmingSession(data));
      dispatch(setFarmingStatus(FarmStatus.Active));
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to start farm session',
        3000,
      );
    },
  });
};
