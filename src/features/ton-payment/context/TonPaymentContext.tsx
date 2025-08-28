import { createContext, useContext, useState, ReactNode } from 'react';
import { TonPaymentStatus } from '../types';

type TonPaymentContextType = {
  status: TonPaymentStatus | null;
  setStatus: (value: TonPaymentStatus | null) => void;
};

const TonPaymentContext = createContext<TonPaymentContextType | undefined>(
  undefined
);

export const TonPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<TonPaymentStatus | null>(null);

  return (
    <TonPaymentContext.Provider
      value={{
        status,
        setStatus,
      }}
    >
      {children}
    </TonPaymentContext.Provider>
  );
};

export const useTonPaymentContext = (): TonPaymentContextType => {
  const context = useContext(TonPaymentContext);
  if (!context) {
    throw new Error('useTonPayment must be used within a TonPaymentProvider');
  }
  return context;
};
