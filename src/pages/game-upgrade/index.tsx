import { useSelector } from 'react-redux';
import styles from './GameUpgradePage.module.css';
import { RootState } from '../../state/store';
import { Balance } from './UI/balance';
import { CardContainer } from './UI/card-container';
import { Card } from './UI/card';
import WebApp from '@twa-dev/sdk';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { BoostCard, UpgradeCard } from '../../types';
import { Popup } from './UI/popup';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '../../hooks';

export const GameUpgradePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const boostCards = useSelector((state: RootState) => state.boostCards);
  const upgradeCards = useSelector((state: RootState) => state.upgradeCards);

  const [selectedCard, setSelectedCard] = useState<
    BoostCard | UpgradeCard | null
  >(null);

  useEffect(() => {
    WebApp.ready();

    const backButton = WebApp.BackButton;
    const handleBackButtonClick = () => {
      navigate(-1);
    };

    backButton.show();
    backButton.onClick(handleBackButtonClick);

    return () => {
      backButton.hide();
      backButton.offClick(handleBackButtonClick);
    };
  }, []);

  return (
    <div className={styles.background}>
      <img
        className={styles.spheres}
        src={window.location.origin + '/skinbits-web/spheres.png'}
        alt="image"
      />
      <div className={styles.content}>
        <Balance balance={user!.balance} />
        <div className={styles.upgrades}>
          <CardContainer
            title="Boosts"
            content={useMemo(
              () =>
                boostCards.map((item, _) => {
                  return (
                    <Card
                      key={`boost-${item.title}-${item.price}`}
                      type="boost"
                      card={item}
                      onClick={() => setSelectedCard(item)}
                    />
                  );
                }),
              [boostCards]
            )}
          />
          <CardContainer
            title="Upgrades"
            content={useMemo(
              () =>
                upgradeCards.map((item, _) => {
                  return (
                    <Card
                      key={`upgrade-${item.title}-${item.price}`}
                      type="upgrade"
                      card={item}
                      onClick={() => setSelectedCard(item)}
                    />
                  );
                }),
              [upgradeCards]
            )}
          />
        </div>
      </div>
      <AnimatePresence>
        {selectedCard && (
          <Popup
            key={`popup-${selectedCard!.title}-${selectedCard!.price}`}
            card={selectedCard!}
            onExit={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
