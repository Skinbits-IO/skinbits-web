import { Address, fromNano, OpenedContract, toNano } from 'ton-core';
import { useTonClient } from './useTonClient';
import { useTonConnect } from './useTonConnect';
import { useEffect, useState } from 'react';
import { MainContract } from '../lib';
import { useAsyncInitialize } from './useAsyncInitialize';

// Contract data interface
interface ContractData {
  counter_value: number;
  recent_sender: Address;
  owner_address: Address;
}

// Main contract hook with all functionality
export function useMainContract() {
  const client = useTonClient();
  const { sender } = useTonConnect();

  const sleep = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

  const [contractData, setContractData] = useState<ContractData | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const mainContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new MainContract(
      Address.parse('0QDUmpYN6mzBj-xSBLqlyTxL768tqlqlqA4fqG8NXqejxXG4')
    );
    return client.open(contract) as OpenedContract<MainContract>;
  }, [client]);

  // Auto-refresh contract data every 5 seconds
  useEffect(() => {
    async function getValue() {
      if (!mainContract) return;

      try {
        setContractData(null);
        const val = await mainContract.getData();
        const { balance } = await mainContract.getBalance();

        setContractData({
          counter_value: val.number,
          recent_sender: val.recent_sender,
          owner_address: val.owner_address,
        });
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }

      await sleep(5000);
      getValue();
    }
    getValue();
  }, [mainContract]);

  // Contract interaction methods with loading states
  const sendIncrement = async () => {
    if (!mainContract) return;
    setIsLoading(true);
    try {
      await mainContract.sendIncrement(sender, toNano('0.05'), 5);
      return true;
    } catch (error) {
      console.error('Increment failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendDeposit = async () => {
    if (!mainContract) return;
    setIsLoading(true);
    try {
      await mainContract.sendDeposit(sender, toNano('1'));
      return true;
    } catch (error) {
      console.error('Deposit failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendWithdrawalRequest = async () => {
    if (!mainContract) return;
    setIsLoading(true);
    try {
      await mainContract.sendWithdrawalRequest(
        sender,
        toNano('0.05'),
        toNano('0.7')
      );
      return true;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const sendPurchase = async (tonPrice: number, skinName: string) => {
    if (!mainContract) return;
    setIsLoading(true);
    try {
      await mainContract.sendPurchase(
        sender,
        toNano(tonPrice.toString()),
        skinName
      );
      return true;
    } catch (error) {
      console.error('Purchase failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // Contract info
    contract_address: mainContract?.address.toString(),
    contract_balance: balance,
    contract_balance_formatted: fromNano(balance),
    isLoading,

    // Contract data
    ...contractData,

    // Contract methods
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
    sendPurchase,
  };
}
