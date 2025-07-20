import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { createDonation } from '../api';
import WebApp from '@twa-dev/sdk';
import { useTonPayment } from '../../../features';

export const useDonation = () => {
  const addNotification = useStatusNotification();
  const { payWithTon } = useTonPayment();

  const buyItem = async (itemName: string, price: number) => {
    const success = await payWithTon({
      itemName: itemName,
      tonPrice: price,
    });

    if (success) {
      console.log(`Player bought ${itemName} for ${price} TON`);
      alert(`Player bought ${itemName} for ${price} TON`);
    }
  };

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
        (async () =>
          await buyItem(
            'Buy more rockets to get the best skins',
            data.donation.amount
          ))();
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
