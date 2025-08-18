import {
  Popup,
  PopupButton,
  RankEnum,
  RANKS,
  RocketIcon,
} from '../../../../shared';
import styles from './RankingPopup.module.css';
import { useUpdateBalance } from '../../../../entities';

interface IRankingPopupProps {
  rank: RankEnum;
  onClose: () => void;
}

export const RankingPopup = ({ rank, onClose }: IRankingPopupProps) => {
  const { mutate, isPending } = useUpdateBalance(onClose);

  const rankInfo = RANKS.get(rank);
  if (!rankInfo) return null;

  const formatedPrice = new Intl.NumberFormat('en-US').format(
    rankInfo.reward ?? 0
  );

  return (
    <Popup onClose={() => {}}>
      <div
        className={styles.imageContainer}
        style={{
          backgroundColor:
            RANKS.get(rankInfo.nextRank ?? RankEnum.bronze)?.color ?? '#000000',
        }}
      >
        <div className={styles.title}>{`New rank: ${
          rankInfo.nextRank ?? ''
        }`}</div>
      </div>
      <div className={styles.description}>
        Congratulations! <br /> You’ve just unlocked a new rank! 🎉 <br />
        As a reward for your achievement, you’re now eligible to claim your
        bonus. Go ahead and grab your reward—keep climbing! 🚀
      </div>
      <div className={styles.priceContainer}>
        <p className={styles.price}>{`+${formatedPrice}`}</p>
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
