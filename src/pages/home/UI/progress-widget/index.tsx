import { motion, AnimatePresence } from 'framer-motion';
import { RocketIcon } from '../../../../components';
import { ranks } from '../../../../constants';
import styles from './ProgressWidget.module.css';

interface IProgressWidgetProps {
  rank: string;
}

export const ProgressWidget = ({ rank }: IProgressWidgetProps) => {
  const rankInfo = ranks.get(rank);
  const formattedReward = new Intl.NumberFormat('en-US').format(
    rankInfo?.reward ?? 0
  );

  return (
    <div className={styles.background}>
      <h5>Progress</h5>
      <div className={styles.row}>
        <p>To next rank</p>
        <div className={styles.reward}>
          <p>{`+${formattedReward}`}</p>
          <RocketIcon size={16} color="#92D0A7" />
        </div>
      </div>
      <div className={styles.progressBar}>
        <AnimatePresence>
          <motion.div
            className={styles.progress}
            style={{
              width: `${
                rankInfo === undefined ? 0 : (100 * 50000) / rankInfo.milestone
              }%`,
            }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
