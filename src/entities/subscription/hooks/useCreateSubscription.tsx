import { useMutation, useQueryClient } from '@tanstack/react-query';
import WebApp from '@twa-dev/sdk';
import { useStatusNotification } from '../../../shared';
import { createSubscription } from '../api';
import { useState } from 'react';

export const useCreateSubscription = (
  onTonPay: (id: string, tonAmount: number) => void
) => {
  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();
  const [amount, setAmount] = useState(0);

  return useMutation({
    mutationFn: (data: {
      subscriptionType: string;
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => {
      setAmount(data.amount);
      return createSubscription(data);
    },
    onSuccess: (data) => {
      if (data.invoiceLink) {
        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
            if (status === 'paid') {
              alert('Payment successful!');
            } else if (status === 'cancelled') {
              alert('Payment was cancelled.');
            } else {
              alert('Payment failed or was closed.');
            }

            queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
          });
        } else {
          WebApp.openLink(data.invoiceLink);
        }
      } else {
        onTonPay(data.subscription.paymentId, amount);
      }
    },
    onError: (err) => {
      console.error('Subscription error:', err);
      addNotification(
        'error',
        err.message || 'Failed to create subscription',
        3000
      );
    },
  });
};
