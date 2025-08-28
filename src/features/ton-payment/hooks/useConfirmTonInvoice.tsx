import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { confirmTonInvoice } from '../api';

export const useConfirmTonInvoice = () => {
  const addNotification = useStatusNotification();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => confirmTonInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
    },
    onError: (err) => {
      console.error('Invoice confirm error:', err);
      addNotification(
        'error',
        err.message || 'Failed to confirm invoice',
        3000
      );
    },
  });
};
