import styles from './Rank.module.css';

interface RankProps {
  rank: string;
}

export const Rank = (props: RankProps) => {
  return (
    <div className={styles.background}>
      <h6 className={styles.rankText}>Rank</h6>
      <h6
        style={{
          fontSize: '17px',
          fontWeight: '700',
        }}
      >
        {props.rank.toUpperCase()}
      </h6>
      <div className={styles.lightning}></div>
    </div>
  );
};
