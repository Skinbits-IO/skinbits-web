import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { createSubscription } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from './useTonPayment';
import { useEffect, useState } from 'react';
import { useDeactivateSubscription } from './useDeactivateSubscription';

export const useSubscription = () => {
  const addNotification = useStatusNotification();
  const { payWithTon, isSuccess, isError, isProcessing } = useTonPayment();
  const deactivateMutation = useDeactivateSubscription();

  const [paymentFinished, setPaymentFinished] = useState(true);
  const [subscriptionId, setSubscriptionId] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (isProcessing) {
      setPaymentFinished(false);
    } else if (!isProcessing && subscriptionId && (isError || isSuccess)) {
      setPaymentFinished(true);
      if (!isSuccess) {
        deactivateMutation.mutate({ id: subscriptionId });
      }
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
      console.log(data);
      setPaymentFinished(false);
      setSubscriptionId(data.subscription.subscriptionId);

      if (data.invoiceLink) {
        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
            if (status !== 'paid') {
              deactivateMutation.mutate({
                id: data.subscription.subscriptionId,
              });
            }

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
      deactivateMutation.isPending ||
      createMutation.isPending ||
      !paymentFinished,
  };
};
