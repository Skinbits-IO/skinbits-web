import styles from './PopupButton.module.css';

interface IPopupButton {
  text: string;
  isRequestPending?: boolean;
  onClick: () => void;
}

export const PopupButton = ({
  text,
  isRequestPending = false,
  onClick,
}: IPopupButton) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={isRequestPending}
    >
      {isRequestPending ? (
        <span className={styles.loader} />
      ) : (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  );
};
