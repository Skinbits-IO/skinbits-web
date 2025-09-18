import { Popup, PopupButton } from '../../../shared';
import { useCancelFarm } from '../../../entities';

interface IFarmCancelPopupProps {
  onClose: () => void;
}

export const FarmCancelPopup = ({ onClose }: IFarmCancelPopupProps) => {
  const { mutate, isPending } = useCancelFarm(onClose);

  return (
    <Popup onClose={onClose}>
      <div className="relative h-[100px] w-full rounded-[16px] bg-[#222]">
        <div className="absolute inset-0 flex items-center justify-center rounded-[16px] bg-black/60 text-white font-['Bebas_Neue'] text-[28px]">
          Cancel Farming Session?
        </div>
      </div>

      <div className="text-center text-sm leading-[1.4] text-[#ccc] border border-dashed border-white/10 rounded-[12px] px-4 py-3">
        Are you sure you want to cancel your current farming session?
        <br />
        Any unclaimed rewards or progress will be lost.
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-3 w-full">
        <PopupButton text="No, Keep Farming" onClick={onClose} />
        <PopupButton
          text="Yes, Cancel"
          isRequestPending={isPending}
          onClick={() => mutate()}
        />
      </div>
    </Popup>
  );
};
