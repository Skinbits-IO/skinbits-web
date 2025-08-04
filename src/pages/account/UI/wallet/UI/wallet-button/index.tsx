import styles from './WalletButton.module.css';

interface IWalletButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

export const WalletButton = ({
  text,
  disabled,
  onClick,
}: IWalletButtonProps) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};
