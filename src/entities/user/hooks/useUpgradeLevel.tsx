import { useMutation } from '@tanstack/react-query';
import { upgradeUserLevel } from '../api';
import { setUser } from '../model';
import { useAppDispatch, useStatusNotification } from '../../../shared';

export const useUpgradeLevel = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { type: 'tap' | 'fuel' | 'farm' }) =>
      upgradeUserLevel(data.type),
    onSuccess: (data) => {
      dispatch(setUser(data));
      onSuccess?.();
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to upgrade level', 3000);
    },
  });
};
