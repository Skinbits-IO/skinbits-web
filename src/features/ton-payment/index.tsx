import { useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { useMainContract } from './hooks';

export type TonPaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface TonPaymentState {
  status: TonPaymentStatus;
  message: string;
  lastPurchase: {
    itemName: string;
    tonPrice: number;
  } | null;
}

interface TonPaymentOptions {
  itemName: string;
  tonPrice: number;
}

export function useTonPayment() {
  const { sendPurchase } = useMainContract();

  const [paymentState, setPaymentState] = useState<TonPaymentState>({
    status: 'idle',
    message: '',
    lastPurchase: null,
  });

  const updateStatus = useCallback(
    (
      status: TonPaymentStatus,
      message: string,
      purchase: TonPaymentState['lastPurchase'] = null
    ) => {
      setPaymentState({ status, message, lastPurchase: purchase });
    },
    []
  );

  const payWithTon = useCallback(
    async (options: TonPaymentOptions): Promise<boolean> => {
      const { itemName, tonPrice } = options;

      updateStatus('processing', `Processing TON payment for ${itemName}...`);

      try {
        // Handle free items
        if (tonPrice === 0) {
          updateStatus('success', `${itemName} accessed successfully (Free)`, {
            itemName,
            tonPrice,
          });

          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.notificationOccurred('success');
          }

          return true;
        }

        // Process paid TON transaction
        const success = await sendPurchase(tonPrice, itemName);

        if (success) {
          updateStatus(
            'success',
            `${itemName} purchased successfully with TON!`,
            {
              itemName,
              tonPrice,
            }
          );

          // Success feedback
          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.notificationOccurred('success');
          }

          if (WebApp.showAlert) {
            WebApp.showAlert(`${itemName} purchased successfully!`);
          }

          return true;
        } else {
          updateStatus('error', 'TON transaction failed');
          return false;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'TON payment failed';
        updateStatus('error', errorMessage);

        // Error feedback
        if (WebApp.HapticFeedback) {
          WebApp.HapticFeedback.notificationOccurred('error');
        }

        return false;
      }
    },
    [sendPurchase, updateStatus]
  );

  const resetPayment = useCallback(() => {
    updateStatus('idle', '', null);
  }, [updateStatus]);

  return {
    // Payment state
    status: paymentState.status,
    message: paymentState.message,
    lastPurchase: paymentState.lastPurchase,
    isProcessing: paymentState.status === 'processing',
    isSuccess: paymentState.status === 'success',
    isError: paymentState.status === 'error',

    // Payment action
    payWithTon,
    resetPayment,
  };
}
