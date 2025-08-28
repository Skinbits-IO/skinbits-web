import {
  Popup,
  PopupButton,
  RankEnum,
  RANKS,
  RocketIcon,
} from '../../../shared';
import { useUpdateBalance } from '../../../entities';

interface IRankingPopupProps {
  rank: RankEnum;
  onClose: () => void;
}

export const RankingPopup = ({ rank, onClose }: IRankingPopupProps) => {
  const { mutate, isPending } = useUpdateBalance(onClose);

  const rankInfo = RANKS.get(rank);
  if (!rankInfo) return null;

  const formattedPrice = new Intl.NumberFormat('en-US').format(
    rankInfo.reward ?? 0
  );
  const nextRankColor =
    RANKS.get(rankInfo.nextRank ?? RankEnum.bronze)?.color ?? '#000000';

  return (
    <Popup onClose={onClose}>
      <div
        className="relative h-[100px] w-full rounded-[16px]"
        style={{ backgroundColor: nextRankColor }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/80 z-10 text-[32px] font-normal text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          {`New rank: ${rankInfo.nextRank ?? ''}`}
        </div>
      </div>

      <div className="w-full text-center px-[17px] py-[21px] rounded-[14px] border border-dashed border-white/10 text-[14px] font-normal text-[#7C7C7C] whitespace-normal break-words">
        Congratulations! <br /> You’ve just unlocked a new rank! 🎉 <br />
        As a reward for your achievement, you’re now eligible to claim your
        bonus. Go ahead and grab your reward—keep climbing! 🚀
      </div>

      <div className="flex items-center justify-center gap-[5px] w-full">
        <p
          className="text-[20px] font-normal text-[#D2F7B6] leading-none"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          +{formattedPrice}
        </p>
        <RocketIcon size={19} color="#D2F7B6" />
      </div>

      <PopupButton
        text="Claim"
        isRequestPending={isPending}
        onClick={() =>
          mutate({
            newBalance: rankInfo.reward ?? 0,
          })
        }
      />
    </Popup>
  );
};
