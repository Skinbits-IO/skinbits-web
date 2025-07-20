import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from './useTonPayment';

export const useDonation = () => {
  const addNotification = useStatusNotification();
  const { payWithTon } = useTonPayment();

  return useMutation({
    mutationFn: (data: {
      amount: number;
      currency: string;
      paymentMethod: string;
      notes: string;
    }) => createDonation(data),

    onSuccess: (data) => {
      console.log('Donation created:', data);

      if (data.invoiceLink && data.donation.currency === 'XTR') {
        // Handle Telegram Stars payment
        console.log('Processing Stars payment...');

        if (WebApp.openInvoice) {
          WebApp.openInvoice(data.invoiceLink, (status) => {
            if (status === 'paid') {
              alert('Payment successful!');
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
        // Handle TON payment - just call payWithTon, it handles everything!
        console.log('Processing TON payment...');

        payWithTon({
          itemName: 'Buy more rockets to get the best skins',
          tonAmount: data.donation.amount,
        })
          .then((success) => {
            if (success) {
              console.log(
                `✅ TON payment successful for ${data.donation.amount} TON`
              );
            } else {
              console.log(`❌ TON payment failed or was cancelled`);
            }
          })
          .catch((error) => {
            console.error('TON payment error:', error);
          });
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
