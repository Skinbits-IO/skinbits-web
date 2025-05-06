import styles from './GameUpgradePage.module.css';
import { Balance } from './UI/balance';
import { CardContainer } from './UI/card-container';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Popup } from './UI/popup';
import { AnimatePresence } from 'framer-motion';
import { useUser, useUserGameInfo } from '../../hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { upgradeUserLevel } from '../../api';
import { useStatusNotification } from '../../hooks/useStatusNotification';
import { BoostCard } from './UI/boost-card';
import { UpgradeCard } from './UI/upgrade-card';
import {
  BOOST_CARDS,
  FARM_LEVEL_PRICES,
  LEVEL_PRICES,
  UPGRADE_CARDS,
} from '../../constants';
import { Card } from '../../types';

export const GameUpgradePage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();
  const addNotification = useStatusNotification();

  const [selectedUpgradeCard, setSelectedUpgradeCard] = useState<
    (Card & { price: number }) | null
  >(null);

  const [selectedBoostCard, setSelectedBoostCard] = useState<
    (Card & { price: number; amount: number }) | null
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

  const upgradeLevelMutation = useMutation({
    mutationFn: (data: { level: string; price: number }) =>
      upgradeUserLevel(data.level, data.price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to upgrade level', 3000);
    },
  });

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
            content={BOOST_CARDS.map((item, index) => {
              let amount: number;
              if (index === 0) {
                amount = userGameInfo!.boost1Quantity;
              } else {
                amount = userGameInfo!.boost2Quantity;
              }

              return (
                <BoostCard
                  key={index}
                  title={item.title}
                  photoUrl={item.photoUrl}
                  price={100_000}
                  amount={amount}
                  onClick={() =>
                    setSelectedBoostCard({ ...item, price: 100_000, amount })
                  }
                />
              );
            })}
          />
          <CardContainer
            title="Upgrades"
            content={UPGRADE_CARDS.map((item, index) => {
              const titleStarts = item.title.split(' ')[0];

              const level =
                titleStarts === 'Fuel'
                  ? userGameInfo!.fuelLevel
                  : titleStarts === 'Rocket'
                  ? userGameInfo!.tapLevel
                  : userGameInfo!.farmLevel;

              let price: number;

              if (titleStarts === 'Farming') {
                price = FARM_LEVEL_PRICES.get(level + 1) ?? 0;
              } else {
                price = LEVEL_PRICES.get(level + 1) ?? 0;
              }

              return (
                <UpgradeCard
                  key={index}
                  title={item.title}
                  photoUrl={item.photoUrl}
                  price={price}
                  level={level}
                  onClick={() => setSelectedUpgradeCard({ ...item, price })}
                />
              );
            })}
          />
        </div>
      </div>
      <AnimatePresence>
        {selectedBoostCard && (
          <Popup
            key={`popup-${selectedBoostCard.title}`}
            card={selectedBoostCard}
            onActivate={() => {}}
            onUpgrade={() => {}}
            onExit={() => setSelectedBoostCard(null)}
          />
        )}
        {selectedUpgradeCard && (
          <Popup
            key={`popup-${selectedUpgradeCard.title}`}
            card={selectedUpgradeCard}
            onUpgrade={() => {
              const levelType =
                selectedUpgradeCard.title.split(' ')[0] === 'Fuel'
                  ? 'upgradeFuel'
                  : selectedUpgradeCard.title.split(' ')[0] === 'Rocket'
                  ? 'upgradeTap'
                  : 'upgradeFarm';

              upgradeLevelMutation.mutate({
                level: levelType,
                price: selectedUpgradeCard.price,
              });
            }}
            isUpgradeRequestPending={upgradeLevelMutation.isPending}
            onExit={() => setSelectedUpgradeCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
