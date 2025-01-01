import styles from './Rank.module.css';

interface RankProps {
  rank: string;
}

export const Rank = (props: RankProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.textBox}>
        <h6 className={styles.rankText}>Rank</h6>
        <h6
          style={{
            fontSize: '18px',
            fontWeight: '400',
            color: '#FFFFFF',
            fontFamily: 'Bebas Neue',
          }}
        >
          {props.rank.toUpperCase()}
        </h6>
      </div>
      <div className={styles.lightning} />
    </div>
  );
};
