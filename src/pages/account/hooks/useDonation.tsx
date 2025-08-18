import { useMutation } from '@tanstack/react-query';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from './useTonPayment';
import { useUpdateDonation } from './useUpdateDonation';
import { useEffect, useState } from 'react';
import { useStatusNotification } from '../../../shared';

export const useDonation = () => {
  const addNotification = useStatusNotification();
  const { payWithTon, isSuccess, isError, isProcessing } = useTonPayment();
  const updateMutation = useUpdateDonation();

  const [donationId, setDonationId] = useState<number>(0);
  const [paymentFinished, setPaymentFinished] = useState(true);

  useEffect(() => {
    if (isProcessing) {
      setPaymentFinished(false);
    } else if (!isProcessing && donationId && (isError || isSuccess)) {
      setPaymentFinished(true);
      updateMutation.mutate({
        id: donationId,
        status: isSuccess ? 'completed' : 'failed',
      });
    }
  }, [donationId, isError, isSuccess, isProcessing]);

  const createMutation = useMutation({
    mutationFn: (data: {
      donationAmount: number;
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => createDonation(data),
    onSuccess: (data) => {
      setPaymentFinished(false);
      setDonationId(data.donation.donation_id);

      if (data.invoiceLink && data.donation.currency === 'XTR') {
        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
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
      updateMutation.isPending || createMutation.isPending || !paymentFinished,
  };
};
