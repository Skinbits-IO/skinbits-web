import { useState } from 'react';
import { useUser } from '../../../shared';
import { SubscriptionCard } from './subscription-card';
import { AnimatePresence } from 'framer-motion';
import { SubscriptionPopup } from './subscription-popup';

export const SubscriptionList = () => {
  const { subscription } = useUser();

  const [show, setShow] = useState(false);
  const [item, setItem] = useState<{
    option: 'gold' | 'premium';
    price: { ton: number; star: number };
  } | null>(null);

  return (
    <>
      <AnimatePresence>
        {show && (
          <SubscriptionPopup item={item} onClose={() => setShow(false)} />
        )}
      </AnimatePresence>
      <div className="w-full flex gap-3 overflow-x-auto scrollbar">
        {!subscription && (
          <SubscriptionCard
            option="free"
            setItem={setItem}
            onOpenPopup={() => setShow(true)}
          />
        )}
        {(!subscription ||
          (subscription && subscription.subscriptionType === 'gold')) && (
          <SubscriptionCard
            option="gold"
            setItem={setItem}
            onOpenPopup={() => setShow(true)}
          />
        )}
        <SubscriptionCard
          option="premium"
          setItem={setItem}
          onOpenPopup={() => setShow(true)}
        />
      </div>
    </>
  );
};
