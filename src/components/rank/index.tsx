import { Rank as RankEnum, RANKS } from '../../shared';
import styles from './Rank.module.css';

interface IRankProps {
  rank: RankEnum;
  onClick?: () => void;
}

export const Rank = ({ rank, onClick }: IRankProps) => {
  const rankColor = RANKS.get(rank)?.color ?? '#000000';

  return (
    <div className={styles.background} onClick={onClick}>
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
        style={{ '--rank-color': rankColor } as React.CSSProperties}
      />
    </div>
  );
};
