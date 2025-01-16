import { useDispatch, useSelector } from 'react-redux';
import { GameWidget } from '../../features';
import { AppDispatch, RootState } from '../../state/store';
import styles from './HomePage.module.css';
import { FarmButton } from './UI/farm-button';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';
import { updateBalance } from '../../state/home/balanceSlice';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const rocketBalance = useSelector(
    (state: RootState) => state.rocketBalance.value
  );

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Header avatarUrl="/skinbits-web/avatar.png" username="German" />
        <div className={styles.upperSection}>
          <Rank rank="silver" />
          <Wallet balance={rocketBalance} />
        </div>
      </div>
      <div className={styles.game}>
        <GameWidget
          onRocketClick={(value: number) => dispatch(updateBalance(value))}
        />
        <FarmButton progress={70} status="unavailable" />
      </div>
    </div>
  );
};
