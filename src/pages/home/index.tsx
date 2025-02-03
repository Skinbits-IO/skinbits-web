import styles from './HomePage.module.css';
import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';

export const HomePage = () => {
  /*const dispatch = useDispatch<AppDispatch>();
  const rocketBalance = useSelector(
    (state: RootState) => state.rocketBalance.value
  );*/

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (WebApp.initData) {
      setUser(JSON.parse(WebApp.initData).user);
    }
  }, []);
  return (
    <div className={styles.background}>
      <div style={{ color: '#FFFFFF' }}>{user ?? 'User is empty'}</div>
      {/* <div className={styles.header}>
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
      </div> */}
    </div>
  );
};
