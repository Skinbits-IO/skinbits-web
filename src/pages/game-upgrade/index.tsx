import styles from './GameUpgradePage.module.css';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Card } from './types';
import {
  BOOST_CARDS,
  FARM_LEVEL_PRICES,
  LEVEL_PRICES,
  UPGRADE_CARDS,
  useBackButton,
  useBoost,
  useStatusNotification,
  useUser,
  useUserGameInfo,
} from '../../shared';
import { buyFarm, upgradeUserLevel } from './api';
import { Balance, BoostCard, CardContainer, Popup, UpgradeCard } from './UI';
import { useUpdateBoost } from './hooks';
import { setUserGameInfo } from '../../store/slices/game/userGameInfoSlice';
import { setUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

export const GameUpgradePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addNotification = useStatusNotification();

  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();
  const { isActive } = useBoost();

  useBackButton();

  const [selectedUpgradeCard, setSelectedUpgradeCard] = useState<
    (Card & { price: number }) | null
  >(null);

  const [selectedBoostCard, setSelectedBoostCard] = useState<
    (Card & { price: number; amount: number }) | null
  >(null);

  const { updateBoostMutation, isPending: isBoostPending } = useUpdateBoost(
    () => setSelectedBoostCard(null)
  );

  const upgradeLevelMutation = useMutation({
    mutationFn: (data: { type: 'tap' | 'fuel' | 'farm'; price: number }) =>
      upgradeUserLevel(data.type, data.price),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setUserGameInfo(data.userGameInfo));
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to upgrade level', 3000);
    },
  });

  const buyFarmMutation = useMutation({
    mutationFn: () => buyFarm(),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setUserGameInfo(data.userGameInfo));
      setSelectedUpgradeCard(null);
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to buy farm', 3000);
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
                  disabled={isActive}
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
            isRequestPending={isBoostPending}
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

              if (levelType === 'farm' && userGameInfo?.farmLevel === 0) {
                buyFarmMutation.mutate();
              } else {
                upgradeLevelMutation.mutate({
                  type: levelType,
                  price: selectedUpgradeCard.price,
                });
              }
            }}
            isRequestPending={
              upgradeLevelMutation.isPending || buyFarmMutation.isPending
            }
            onExit={() => setSelectedUpgradeCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
