import { RocketIcon } from '../../../../components';
import styles from './Balance.module.css';

interface IBalanceProps {
  balance: number;
}

export const Balance = ({ balance }: IBalanceProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div className={styles.background}>
      <p className={styles.balanceText}>Balance</p>
      <div className={styles.balanceRow}>
        <RocketIcon size={30} color="#FFFFFF" />
        <h3 className={styles.balance}>{formattedBalance}</h3>
      </div>
    </div>
  );
};
