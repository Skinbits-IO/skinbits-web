import { useMutation } from '@tanstack/react-query';
import { updateUserBalance } from '../api';
import { setUser } from '../model';
import { useAppDispatch, useStatusNotification } from '../../../shared';

export const useUpdateBalance = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { newBalance: number }) =>
      updateUserBalance(data.newBalance),
    onSuccess: (data) => {
      dispatch(setUser(data));
      onSuccess?.();
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to update balance', 3000);
    },
  });
};
