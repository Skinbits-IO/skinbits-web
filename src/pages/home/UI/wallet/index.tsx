import { RocketIcon } from '../../../../components';
import styles from './Wallet.module.css';

interface IWalletProps {
  balance: number;
}

export const Wallet = ({ balance }: IWalletProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div className={styles.background}>
      <h6 className={styles.header}>Balance</h6>
      <div className={styles.balance}>
        <RocketIcon size={24} color="#FFFFFF" />
        <h5 className={styles.balanceText}>{formattedBalance}</h5>
      </div>
    </div>
  );
};
