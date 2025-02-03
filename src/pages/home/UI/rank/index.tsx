import { ranksColors } from '../../../../constants';
import styles from './Rank.module.css';

interface IRankProps {
  rank: string;
}

export const Rank = ({ rank }: IRankProps) => {
  const rankColor = ranksColors.get(rank) ?? '#494949';

  return (
    <div className={styles.background}>
      <div className={styles.textBox}>
        <h6 className={styles.rankText}>Rank</h6>
        <h6
          style={{
            fontSize: '1.125rem',
            fontWeight: '400',
            color: '#FFFFFF',
            fontFamily: 'Bebas Neue',
          }}
        >
          {rank.toUpperCase()}
        </h6>
      </div>
      <div
        className={styles.lightning}
        style={{ backgroundColor: rankColor }}
      />
    </div>
  );
};
