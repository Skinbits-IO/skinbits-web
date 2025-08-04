import { useState, useCallback, useEffect } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import WebApp from '@twa-dev/sdk';

export type TonPaymentStatus =
  | 'idle'
  | 'connecting'
  | 'processing'
  | 'success'
  | 'error';

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

  // Store pending payment to process after connection
  const [pendingPayment, setPendingPayment] =
    useState<TonPaymentOptions | null>(null);

  const updateStatus = useCallback(
    (
      status: TonPaymentStatus,
      message: string,
      purchase: TonPaymentState['lastPurchase'] = null
    ) => {
      setPaymentState({ status, message, lastPurchase: purchase });
      console.log(`Payment Status: ${status} - ${message}`);
    },
    []
  );

  // Convert TON to nanotons (1 TON = 1,000,000,000 nanotons)
  const tonToNano = (ton: number): string => {
    return Math.floor(ton * 1_000_000_000).toString();
  };

  // Process the actual transaction
  const processTransaction = useCallback(
    async (options: TonPaymentOptions): Promise<boolean> => {
      const { itemName, tonAmount, contractAddress } = options;

      try {
        console.log('🚀 Processing transaction:', { itemName, tonAmount });

        const nanoAmount = tonToNano(tonAmount);
        console.log(`💰 Converting ${tonAmount} TON to ${nanoAmount} nanotons`);

        const validUntilTimestamp = Math.floor(Date.now() / 1000) + 300;
        const transaction = {
          messages: [
            {
              address:
                contractAddress ||
                'UQDUmpYN6mzBj-xSBLqlyTxL768tqlqlqA4fqG8NXqejxXG4',
              amount: nanoAmount,
            },
          ],
          validUntil: validUntilTimestamp,
        };

        console.log('📝 Transaction:', JSON.stringify(transaction, null, 2));
        console.log('📤 Sending transaction...');

        updateStatus('processing', 'Confirm transaction in your wallet...');

        const result = await tonConnectUI.sendTransaction(transaction);
        console.log('✅ Transaction result:', result);

        if (result) {
          updateStatus('success', `${itemName} purchased successfully!`, {
            itemName,
            tonAmount: tonAmount.toString(),
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
          console.warn('⚠️ Transaction returned false/null');
          updateStatus('error', 'Transaction was cancelled');
          return false;
        }
      } catch (error: any) {
        console.error('💥 Transaction error:', error);

        const errorMessage = error?.message || 'Payment failed';
        updateStatus('error', `Error: ${errorMessage}`);

        if (WebApp.HapticFeedback) {
          WebApp.HapticFeedback.notificationOccurred('error');
        }

        return false;
      }
    },
    [tonConnectUI, updateStatus, tonToNano]
  );

  // Watch for wallet connection changes
  useEffect(() => {
    if (tonConnectUI.connected && pendingPayment) {
      console.log('✅ Wallet connected! Processing pending payment...');

      // Process the pending payment
      const payment = pendingPayment;
      setPendingPayment(null);

      // Small delay to ensure UI is ready
      setTimeout(() => {
        processTransaction(payment);
      }, 500);
    }
  }, [tonConnectUI.connected, pendingPayment, processTransaction]);

  // Main payment function - handles everything automatically
  const payWithTon = useCallback(
    async (options: TonPaymentOptions): Promise<boolean> => {
      const { itemName, tonAmount } = options;

      console.log('🚀 Starting payment:', options);

      // Handle free items immediately
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
        console.log('❌ Wallet not connected, opening connection modal...');
        updateStatus('connecting', 'Connecting to wallet...');

        // Store the payment to process after connection
        setPendingPayment(options);

        // Open connection modal
        tonConnectUI.openModal();

        // Return false for now - the actual payment will be processed in useEffect
        return false;
      } else {
        // Wallet already connected, process immediately
        console.log('✅ Wallet connected, processing payment...');
        return await processTransaction(options);
      }
    },
    [tonConnectUI, updateStatus, processTransaction]
  );

  const resetPayment = useCallback(() => {
    updateStatus('idle', '', null);
    setPendingPayment(null);
  }, [updateStatus]);

  return {
    // Payment state
    status: paymentState.status,
    message: paymentState.message,
    lastPurchase: paymentState.lastPurchase,
    isProcessing: ['connecting', 'processing'].includes(paymentState.status),
    isConnecting: paymentState.status === 'connecting',
    isSuccess: paymentState.status === 'success',
    isError: paymentState.status === 'error',

    // Wallet info
    connected: tonConnectUI.connected,
    wallet: tonConnectUI.wallet,

    // Payment actions
    payWithTon,
    resetPayment,
  };
}
