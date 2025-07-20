import { useState, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

export type TonPaymentStatus = 'idle' | 'processing' | 'success' | 'error';

interface TonPaymentState {
  status: TonPaymentStatus;
  message: string;
  lastPurchase: {
    itemName: string;
    tonAmount: string;
  } | null;
}

interface TonPaymentOptions {
  itemName: string;
  tonAmount: number;
  contractAddress?: string;
}

export function useTonPayment() {
  const [tonConnectUI] = useTonConnectUI();

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

  // Convert TON to nanotons (1 TON = 1,000,000,000 nanotons)
  const tonToNano = (ton: number): string => {
    return Math.floor(ton * 1_000_000_000).toString();
  };

  const payWithTon = useCallback(
    async (options: TonPaymentOptions): Promise<boolean> => {
      const { itemName, tonAmount, contractAddress } = options;

      updateStatus('processing', `Processing payment for ${itemName}...`);

      try {
        // Handle free items
        if (tonAmount === 0) {
          updateStatus('success', `${itemName} accessed successfully (Free)`, {
            itemName,
            tonAmount: '0',
          });

          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.notificationOccurred('success');
          }

          return true;
        }

        // Check if wallet is connected
        if (!tonConnectUI.connected) {
          updateStatus('error', 'Please connect your TON wallet first');
          return false;
        }

        // Create transaction
        const transaction = {
          messages: [
            {
              address:
                contractAddress ||
                'UQDUmpYN6mzBj-xSBLqlyTxL768tqlqlqA4fqG8NXqejxXG4', // Your contract
              amount: tonToNano(tonAmount),
              payload: btoa(itemName), // Base64 encode item name as payload
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
        };

        // Send transaction
        const result = await tonConnectUI.sendTransaction(transaction);

        if (result) {
          updateStatus('success', `${itemName} purchased successfully!`, {
            itemName,
            tonAmount: tonAmount + '',
          });

          // Success feedback
          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.notificationOccurred('success');
          }

          if (WebApp.showAlert) {
            WebApp.showAlert(`${itemName} purchased successfully!`);
          }

          return true;
        } else {
          updateStatus('error', 'Transaction was cancelled');
          return false;
        }
      } catch (error: any) {
        const errorMessage = error?.message || 'Payment failed';
        updateStatus('error', errorMessage);

        // Error feedback
        if (WebApp.HapticFeedback) {
          WebApp.HapticFeedback.notificationOccurred('error');
        }

        return false;
      }
    },
    [tonConnectUI, updateStatus]
  );

  const resetPayment = useCallback(() => {
    updateStatus('idle', '', null);
  }, [updateStatus]);

  // Or even simpler - just try to open the modal
  const testModal = () => {
    try {
      tonConnectUI.openModal();
    } catch (error) {
      console.error('Failed to open modal:', error);
    }
  };

  return {
    // Payment state
    status: paymentState.status,
    message: paymentState.message,
    lastPurchase: paymentState.lastPurchase,
    isProcessing: paymentState.status === 'processing',
    isSuccess: paymentState.status === 'success',
    isError: paymentState.status === 'error',

    // Wallet info
    connected: tonConnectUI.connected,
    wallet: tonConnectUI.wallet,

    // Payment action
    payWithTon,
    resetPayment,
    testModal,
  };
}
