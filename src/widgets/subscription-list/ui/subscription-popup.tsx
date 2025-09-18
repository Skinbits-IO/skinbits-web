import { useTonConnectUI } from '@tonconnect/ui-react';
import { useCreateSubscription } from '../../../entities';
import { useTonPayment } from '../../../features';
import { Popup, PopupButton } from '../../../shared';

interface ISubscriptionPopupProps {
  item: {
    option: 'gold' | 'premium';
    price: { ton: number; star: number };
  } | null;
  onClose: () => void;
}

export const SubscriptionPopup = ({
  item,
  onClose,
}: ISubscriptionPopupProps) => {
  const { payWithTon } = useTonPayment();
  const [tonConnectUI] = useTonConnectUI();
  const { mutate, isPending } = useCreateSubscription(payWithTon);

  const handleTonPayment = () => {
    mutate({
      subscriptionType: item!.option,
      amount: item!.price.ton,
      currency: 'TON',
      paymentMethod: 'ton',
      notes: 'Monthly subscription via TON',
    });
  };

  const handleTelegramPayment = () => {
    mutate({
      subscriptionType: item!.option,
      amount: item!.price.star,
      currency: 'XTR',
      paymentMethod: 'telegram',
      notes: 'Monthly subscription via Telegram',
    });
  };

  return (
    <Popup onClose={onClose}>
      {/* Top section */}
      <div className="relative w-full h-[100px] rounded-xl bg-white/15">
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl text-white text-[28px]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          Choose Your Payment Method
        </div>
      </div>

      {/* Description */}
      <div className="p-4 border border-dashed border-white/10 rounded-xl text-center text-sm text-accent leading-relaxed">
        Select how you’d like to pay for your premium subscription.
      </div>

      {/* Button row */}
      <div className="grid grid-cols-[1fr_1fr] gap-3 w-full">
        <PopupButton
          text="Pay with TON"
          disabled={!tonConnectUI.connected}
          onClick={handleTonPayment}
        />
        <PopupButton text="Pay with Stars" onClick={handleTelegramPayment} />
      </div>

      {/* Loader overlay */}
      {isPending && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white/80 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </Popup>
  );
};
