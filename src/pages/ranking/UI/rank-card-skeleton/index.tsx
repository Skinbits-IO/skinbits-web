import styles from './RankCardSkeleton.module.css';

export const RankCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.userInfoContainer}>
        <div className={styles.rankCircle} />
        <div className={styles.userInfo}>
          <div className={styles.avatarCircle} />
          <div className={styles.nameBar} />
        </div>
      </div>
      <div className={styles.pointsContainer}>
        <div className={styles.pointsBar} />
        <div className={styles.iconCircle} />
      </div>
    </div>
  );
};
