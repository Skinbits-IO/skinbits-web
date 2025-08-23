import { useTonConnectUI } from '@tonconnect/ui-react';
import { useTonPaymentContext } from '../context';
import { TonPaymentStatus } from '../types';
import WebApp from '@twa-dev/sdk';
import { useConfirmTonInvoice } from './useConfirmTonInvoice';
import { TON_WALLET_ADDRESS } from '../config';

export const useTonPayment = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { setStatus } = useTonPaymentContext();
  const { mutate } = useConfirmTonInvoice();

  // Convert TON to nanotons (1 TON = 1,000,000,000 nanotons)
  const tonToNano = (ton: number): string => {
    return Math.floor(ton * 1_000_000_000).toString();
  };

  const payWithTon = async (id: string, tonAmount: number) => {
    if (!tonConnectUI.connected) return;

    try {
      const nanoAmount = tonToNano(tonAmount);
      const validUntilTimestamp = Math.floor(Date.now() / 1000) + 300;
      const transaction = {
        messages: [
          {
            address: TON_WALLET_ADDRESS,
            amount: nanoAmount,
          },
        ],
        validUntil: validUntilTimestamp,
      };

      const result = await tonConnectUI.sendTransaction(transaction);
      console.log('✅ Transaction result:', result);

      if (result) {
        setStatus(TonPaymentStatus.Success);
        mutate({ id, amount: tonAmount });

        // Success feedback
        if (WebApp.HapticFeedback) {
          WebApp.HapticFeedback.notificationOccurred('success');
        }

        if (WebApp.showAlert) {
          WebApp.showAlert(`purchased successfully!`);
        }

        return true;
      } else {
        console.warn('⚠️ Transaction returned false/null');
        setStatus(TonPaymentStatus.Error);
        return false;
      }
    } catch (error: any) {
      console.error('💥 Transaction error:', error);
      setStatus(TonPaymentStatus.Error);

      if (WebApp.HapticFeedback) {
        WebApp.HapticFeedback.notificationOccurred('error');
      }

      return false;
    }
  };

  return { payWithTon };
};
