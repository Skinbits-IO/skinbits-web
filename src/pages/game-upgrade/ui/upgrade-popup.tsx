import { useEffect, useState } from 'react';
import { Card } from '../types';
import { Popup, PopupButton, RocketIcon, useUser } from '../../../shared';

interface IUpgradePopupProps {
  card: Card & { price: number; amount?: number };
  onActivate?: () => void;
  onUpgrade: () => void;
  isRequestPending?: boolean;
  onExit: () => void;
}

export const UpgradePopup = ({
  card,
  onActivate,
  onUpgrade,
  isRequestPending,
  onExit,
}: IUpgradePopupProps) => {
  const { user } = useUser();

  const [activateLoading, setActivateLoading] = useState(false);
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const isBoost = card.amount !== undefined;

  useEffect(() => {
    if (!isRequestPending) setActivateLoading(false);
  }, [isRequestPending]);

  return (
    <Popup onClose={onExit}>
      <div className="relative h-[100px] w-full rounded-[16px] overflow-hidden">
        <img
          src={window.location.origin + card.photoUrl}
          alt={card.title}
          className="absolute inset-0 m-auto h-full w-auto z-[2] rounded-[16px] object-cover object-center"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.77)] z-[3] text-[32px] font-normal font-['Bebas_Neue'] text-white leading-none">
          {card.title}
        </div>
      </div>

      <div
        className="h-fit w-full flex justify-center items-center px-[17px] py-[21px] rounded-[14px] border border-dashed border-white/10 text-[14px] font-normal text-[#7C7C7C] text-center break-words break-all overflow-hidden whitespace-normal"
        dangerouslySetInnerHTML={{ __html: card.description }}
      />

      <div className="w-full flex items-center justify-center gap-[5px]">
        <RocketIcon size={19} color="#D2F7B6" />
        <p className="text-[20px] font-normal font-['Bebas_Neue'] text-[#D2F7B6] leading-none">
          {formatedPrice}
        </p>
      </div>

      <div
        className={`w-full grid gap-[10px] ${isBoost ? 'grid-cols-2' : 'grid-cols-1'}`}
      >
        {isBoost && onActivate && (
          <PopupButton
            disabled={card.amount === 0}
            text={`Activate (${card.amount})`}
            isRequestPending={activateLoading}
            onClick={() => {
              setActivateLoading(true);
              onActivate();
            }}
          />
        )}
        <PopupButton
          disabled={user!.balance < card.price}
          text={isBoost ? 'Buy' : 'Upgrade'}
          isRequestPending={Boolean(isRequestPending && !activateLoading)}
          onClick={onUpgrade}
        />
      </div>
    </Popup>
  );
};
