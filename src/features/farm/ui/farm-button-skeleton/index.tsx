import styles from './FarmButtonSkeleton.module.css';

export const FarmButtonSkeleton = () => (
  <div className={styles.background}>
    <div className={styles.progressBar} />
    <div className={styles.content}>
      <div className={styles.line} style={{ width: '60%' }} />
      <div className={styles.rocketContainer}>
        <div className={styles.rocketTextPlaceholder} />
        <div className={styles.rocketIconPlaceholder} />
      </div>
    </div>
  </div>
);
