import styles from './PopupButton.module.css';

interface IPopupButton {
  text: string;
  isRequestPending?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

export const PopupButton = ({
  text,
  isRequestPending = false,
  disabled = false,
  onClick,
}: IPopupButton) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={isRequestPending || disabled}
    >
      {isRequestPending ? (
        <span className={styles.loader} />
      ) : (
        <span className={styles.text}>{text}</span>
      )}
    </button>
  );
};
