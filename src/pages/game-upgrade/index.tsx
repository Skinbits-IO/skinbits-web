import { useSelector } from 'react-redux';
import styles from './GameUpgradePage.module.css';
import { RootState } from '../../state/store';
import { Balance } from './UI/balance';
import { CardContainer } from './UI/card-container';
import { Card } from './UI/card';
import { BackButton } from './UI/BackButton';

export const GameUpgradePage = () => {
  const user = useSelector((state: RootState) => state.user);
  const boostCards = useSelector((state: RootState) => state.boostCards);
  const upgradeCards = useSelector((state: RootState) => state.upgradeCards);

  return (
    <div className={styles.background}>
      <img
        className={styles.spheres}
        src={window.location.origin + '/skinbits-web/spheres.png'}
        alt="image"
      />
      <Balance balance={user.balance} />
      <div className={styles.upgrades}>
        <CardContainer
          title="Boosts"
          content={boostCards.map((item, _) => {
            return <Card type="boost" card={item} />;
          })}
        />
        <CardContainer
          title="Upgrades"
          content={upgradeCards.map((item, _) => {
            return <Card type="upgrade" card={item} />;
          })}
        />
      </div>
      <BackButton />
    </div>
  );
};
