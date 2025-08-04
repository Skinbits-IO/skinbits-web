import { createContext, useContext, useState, ReactNode } from 'react';

type PremiumCardContextType = {
  show: boolean;
  setShow: (value: boolean) => void;
  item: {
    option: 'gold' | 'premium';
    price: { ton: number; star: number };
  } | null;
  setItem: (
    item: {
      option: 'gold' | 'premium';
      price: { ton: number; star: number };
    } | null
  ) => void;
};

const PremiumCardContext = createContext<PremiumCardContextType | undefined>(
  undefined
);

export const PremiumCardProvider = ({ children }: { children: ReactNode }) => {
  const [show, setShow] = useState<boolean>(false);
  const [item, setItem] = useState<{
    option: 'gold' | 'premium';
    price: { ton: number; star: number };
  } | null>(null);

  return (
    <PremiumCardContext.Provider
      value={{
        show,
        setShow,
        item,
        setItem,
      }}
    >
      {children}
    </PremiumCardContext.Provider>
  );
};

export const usePremiumCardContext = (): PremiumCardContextType => {
  const context = useContext(PremiumCardContext);
  if (!context) {
    throw new Error('usePremiumCard must be used within a PremiumCardProvider');
  }
  return context;
};
