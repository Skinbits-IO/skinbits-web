import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubscription } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from './useTonPayment';
import { useEffect, useState } from 'react';
import { useConfirmInvoice } from './useConfirmInvoice';
import { useStatusNotification } from '../../../shared';

export const useSubscription = () => {
  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();

  const { payWithTon, isSuccess, isError, isProcessing } = useTonPayment();
  const confirmInvoiceMutation = useConfirmInvoice();

  const [paymentFinished, setPaymentFinished] = useState(true);
  const [subscriptionId, setSubscriptionId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (isProcessing) {
      setPaymentFinished(false);
    } else if (!isProcessing && subscriptionId && (isError || isSuccess)) {
      setPaymentFinished(true);
    }
  }, [isError, isSuccess, isProcessing]);

  const createMutation = useMutation({
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
      setPaymentFinished(false);
      setSubscriptionId(data.subscription.subscriptionId);

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
            setPaymentFinished(true);
          });
        } else {
          WebApp.openLink(data.invoiceLink);
        }
      } else {
        payWithTon({
          itemName: 'Buy more rockets to get the best skins',
          tonAmount: amount,
        }).catch((error) => {
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
      confirmInvoiceMutation.isPending ||
      createMutation.isPending ||
      !paymentFinished,
  };
};
