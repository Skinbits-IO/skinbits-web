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
      if (WebApp.openInvoice) {
        WebApp.openInvoice(data.invoiceLink, (status) => {
          if (status === 'paid') {
            console.log('Payment successful!');
            alert('Payment successful!');
          } else if (status === 'cancelled') {
            console.log('Payment was cancelled.');
            alert('Payment was cancelled.');
          } else {
            console.log('Payment failed or was closed.');
            alert('Payment failed or was closed.');
          }
        });
      } else {
        console.warn('openInvoice is not supported. Opening link directly.');
        WebApp.openLink(data.invoiceLink);
      }
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
