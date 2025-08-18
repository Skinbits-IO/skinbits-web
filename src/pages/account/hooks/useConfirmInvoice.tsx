import { useMutation } from '@tanstack/react-query';
import { confirmInvoice } from '../api';
import { useStatusNotification } from '../../../shared';

export const useConfirmInvoice = () => {
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { id: string; amount: number }) =>
      confirmInvoice(data.id, data.amount),
    onSuccess: (data) => {
      console.log('Invoice confirmed:', data);
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
