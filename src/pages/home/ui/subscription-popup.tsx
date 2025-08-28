import { Popup, PopupButton } from '../../../shared';
import { useNavigate } from 'react-router';
import { SubscriptionList } from '../../../widgets';

interface ISubscriptionPopup {
  onClose: () => void;
}

export const SubscriptionPopup = ({ onClose }: ISubscriptionPopup) => {
  const navigate = useNavigate();

  return (
    <Popup onClose={onClose}>
      <div className="relative h-[100px] w-full rounded-[16px] bg-white/50">
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[16px] bg-black/60 text-[28px] text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          Upgrade to Premium?
        </div>
      </div>

      <div className="w-full flex flex-shrink-0 gap-2.5 overflow-x-auto overflow-y-hidden scrollbar-none">
        <SubscriptionList />
      </div>

      <PopupButton text="Get Premium" onClick={() => navigate('/account')} />
    </Popup>
  );
};
