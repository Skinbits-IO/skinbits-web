import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';
import { useStatusNotification } from '../../../shared';

export const useCreateDonation = (
  onTonPay: (id: string, tonAmount: number) => void
) => {
  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => createDonation(data),
    onSuccess: (data) => {
      if (data.invoiceLink && data.donation.currency === 'XTR') {
        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
            if (status === 'paid') {
              alert('Payment successful!');
              queryClient.invalidateQueries({ queryKey: ['user'] });
            } else if (status === 'cancelled') {
              alert('Payment was cancelled.');
            } else {
              alert('Payment failed or was closed.');
            }
          });
        } else {
          WebApp.openLink(data.invoiceLink);
        }
      } else {
        onTonPay(data.donation.payment_id, data.donation.amount);
      }
    },
    onError: (err) => {
      console.error('Donation error:', err);
      addNotification(
        'error',
        err.message || 'Failed to create donation',
        3000
      );
    },
  });
};
