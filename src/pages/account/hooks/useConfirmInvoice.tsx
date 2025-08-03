import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { confirmInvoice } from '../api';

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
