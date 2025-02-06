import styles from './PopupButton.module.css';

interface IPopupButton {
  text: string;
  onClick: () => void;
}

export const PopupButton = ({ text, onClick }: IPopupButton) => {
  return (
    <button className={styles.button} onClick={() => onClick()}>
      <p className={styles.text}>{text}</p>
    </button>
  );
};
