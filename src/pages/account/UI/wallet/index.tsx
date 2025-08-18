import { RocketIcon } from '../../../../shared';
import { WalletButton } from './UI';
import styles from './Wallet.module.css';

interface IWalletProps {
  balance: number;
}

export const Wallet = ({ balance }: IWalletProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div className={styles.background}>
      <div className={styles.balanceContainer}>
        <h6>Balance</h6>
        <div className={styles.balance}>
          <RocketIcon size={24} color="#FFFFFF" />
          <h5 className={styles.balanceText}>{formattedBalance}</h5>
        </div>
        <div className={styles.buttons}>
          <WalletButton text="Receive" disabled={true} onClick={() => {}} />
          <WalletButton text="Send" disabled={true} onClick={() => {}} />
          <WalletButton text="Convert" disabled={true} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
