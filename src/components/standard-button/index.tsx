import styles from './StandardButton.module.css';

interface IStandardButtonProps {
  text: string;
  onClick: () => void;
}

export const StandardButton = ({ text, onClick }: IStandardButtonProps) => {
  return (
    <button className={styles.background} onClick={() => onClick()}>
      {text}
    </button>
  );
};
