import { useMutation } from '@tanstack/react-query';
import { cancelFarmSession } from '../api';
import { useAppDispatch, useStatusNotification } from '../../../shared';
import { setFarmingStatus } from '../model';
import { FarmStatus } from '../types';

export const useCancelFarm = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: () => cancelFarmSession(),
    onSuccess: () => {
      dispatch(setFarmingStatus(FarmStatus.Inactive));
      onSuccess?.();
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to cancel farm session',
        3000,
      );
    },
  });
};
