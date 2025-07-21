import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from './useTonPayment';
import { useUpdateDonation } from './useUpdateDonation';
import { useState } from 'react';

export const useDonation = () => {
  const addNotification = useStatusNotification();
  const { payWithTon } = useTonPayment();
  const updateMutation = useUpdateDonation();

  const [paymentFinished, setPaymentFinished] = useState(true);

  const createMutation = useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => createDonation(data),
    onSuccess: (data) => {
      setPaymentFinished(false);

      if (data.invoiceLink && data.donation.currency === 'XTR') {
        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
            updateMutation.mutate({
              id: data.donation.donation_id,
              status: status === 'paid' ? 'success' : 'failed',
            });

            if (status === 'paid') {
              alert('Payment successful!');
            } else if (status === 'cancelled') {
              alert('Payment was cancelled.');
            } else {
              alert('Payment failed or was closed.');
            }

            setPaymentFinished(true);
          });
        } else {
          WebApp.openLink(data.invoiceLink);
        }
      } else {
        payWithTon({
          itemName: 'Buy more rockets to get the best skins',
          tonAmount: data.donation.amount,
        })
          .then((success) => {
            updateMutation.mutate({
              id: data.donation.donation_id,
              status: success ? 'success' : 'failed',
            });

            setPaymentFinished(true);
          })
          .catch((error) => {
            console.error('TON payment error:', error);
          });
      }
    },
    onError: (err) => {
      setPaymentFinished(false);

      console.error('Donation error:', err);
      addNotification(
        'error',
        err.message || 'Failed to create donation',
        3000
      );
    },
  });

  return {
    createMutation,
    isPending:
      updateMutation.isPending || createMutation.isPending || !paymentFinished,
  };
};
