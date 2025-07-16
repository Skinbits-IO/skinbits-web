import { useStatusNotification } from '../useStatusNotification';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserBalance } from '../../api';

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();

  const mutation = useMutation({
    mutationFn: (data: { newBalance: number }) =>
      updateUserBalance(data.newBalance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to update balance', 3000);
    },
  });

  return { mutation };
};
