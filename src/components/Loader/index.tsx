import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.background}>
      <p className={styles.loader}>Loading...</p>
    </div>
  );
};
