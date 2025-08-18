import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProgressWidget.module.css';
import { RankEnum, RANKS, RocketIcon } from '../../../../shared';

interface IProgressWidgetProps {
  rank: RankEnum;
  totalEarned: number;
}

export const ProgressWidget = ({ rank, totalEarned }: IProgressWidgetProps) => {
  const rankInfo = RANKS.get(rank);
  const formattedReward = new Intl.NumberFormat('en-US').format(
    rankInfo?.reward ?? 0
  );

  return (
    <div className={styles.background}>
      <h5>Progress</h5>
      <div className={styles.row}>
        <p>To next rank</p>
        {formattedReward !== '0' && (
          <div className={styles.reward}>
            <p>{`+${formattedReward}`}</p>
            <RocketIcon size={16} color="#92D0A7" />
          </div>
        )}
      </div>
      <div className={styles.progressBar}>
        <AnimatePresence>
          <motion.div
            className={styles.progress}
            style={{
              width: `${
                rankInfo === undefined
                  ? 0
                  : (100 * totalEarned) / rankInfo.milestone
              }%`,
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
