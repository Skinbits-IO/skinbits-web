import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';

export const useDonation = () => {
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => createDonation(data),
    onSuccess: (data) => {
      WebApp.openLink(data.invoiceLink);
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to create donation',
        3000
      );
    },
  });
};
