import styles from './StandardButton.module.css';

interface IStandardButtonProps {
  text: string;
  isRequestPending?: boolean;
  onClick: () => void;
}

export const StandardButton = ({
  text,
  isRequestPending = false,
  onClick,
}: IStandardButtonProps) => {
  return (
    <button className={styles.background} onClick={() => onClick()}>
      {isRequestPending ? (
        <span className={styles.loader} />
      ) : (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  );
};
