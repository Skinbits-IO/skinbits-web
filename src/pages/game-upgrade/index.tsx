import styles from './GameUpgradePage.module.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from './types';
import {
  BOOST_CARDS,
  FARM_LEVEL_PRICES,
  LEVEL_PRICES,
  UPGRADE_CARDS,
  useBackButton,
  useStatusNotification,
  useUser,
  useUserGameInfo,
} from '../../shared';
import { buyFarm, updateBoost, upgradeFarm, upgradeUserLevel } from './api';
import { Balance, BoostCard, CardContainer, Popup, UpgradeCard } from './UI';

export const GameUpgradePage = () => {
  const queryClient = useQueryClient();

  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();
  const addNotification = useStatusNotification();
  useBackButton();

  const [selectedUpgradeCard, setSelectedUpgradeCard] = useState<
    (Card & { price: number }) | null
  >(null);

  const [selectedBoostCard, setSelectedBoostCard] = useState<
    (Card & { price: number; amount: number }) | null
  >(null);

  const upgradeLevelMutation = useMutation({
    mutationFn: (data: { type: 'tap' | 'fuel' | 'farm'; price: number }) =>
      upgradeUserLevel(data.type, data.price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to upgrade level', 3000);
    },
  });

  const buyFarmMutation = useMutation({
    mutationFn: () => buyFarm(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to buy farm', 3000);
    },
  });

  const upgradeFarmMutation = useMutation({
    mutationFn: (data: { price: number }) => upgradeFarm(data.price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to upgrade farm', 3000);
    },
  });

  const updateBoostMutation = useMutation({
    mutationFn: (data: { type: 'tapboost' | 'fuelboost'; quantity: number }) =>
      updateBoost(data.type, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setSelectedBoostCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to update boost', 3000);
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
              const titleStarts = item.title.split(' ')[0];
              let amount: number;
              if (titleStarts === 'Fuel') {
                amount = userGameInfo!.fuelboostQuantity;
              } else {
                amount = userGameInfo!.tapboostQuantity;
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
            isRequestPending={updateBoostMutation.isPending}
            onActivate={() => {
              const titleStarts = selectedBoostCard.title.split(' ')[0];
              let type: 'tapboost' | 'fuelboost' = 'tapboost';
              if (titleStarts === 'Fuel') {
                type = 'fuelboost';
              }
              updateBoostMutation.mutate({ type, quantity: -1 });
            }}
            onUpgrade={() => {
              const titleStarts = selectedBoostCard.title.split(' ')[0];
              let type: 'tapboost' | 'fuelboost' = 'tapboost';
              if (titleStarts === 'Fuel') {
                type = 'fuelboost';
              }
              updateBoostMutation.mutate({ type, quantity: 1 });
            }}
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
                  ? 'fuel'
                  : selectedUpgradeCard.title.split(' ')[0] === 'Rocket'
                  ? 'tap'
                  : 'farm';

              if (levelType === 'farm') {
                if (userGameInfo?.farmLevel === 0) {
                  buyFarmMutation.mutate();
                } else {
                  upgradeFarmMutation.mutate({
                    price: selectedUpgradeCard.price,
                  });
                }
              } else {
                upgradeLevelMutation.mutate({
                  type: levelType,
                  price: selectedUpgradeCard.price,
                });
              }
            }}
            isRequestPending={
              upgradeLevelMutation.isPending ||
              buyFarmMutation.isPending ||
              upgradeFarmMutation.isPending
            }
            onExit={() => setSelectedUpgradeCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
