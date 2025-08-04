import styles from './TopUp.module.css';

interface ITopUpProps {
  onClick: () => void;
}

export const TopUp = ({ onClick }: ITopUpProps) => {
  return (
    <div className={styles.background}>
      <p>Do you want to get more rockets?</p>
      <button className={styles.button} onClick={onClick}>
        Buy some rockets
      </button>
    </div>
  );
};
