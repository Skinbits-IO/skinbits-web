import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Balance } from './balance';
import { CardContainer } from './card-container';
import { BoostCard } from './boost-card';
import { UpgradePopup } from './upgrade-popup';
import { UpgradeCard } from './upgrade-card';
import {
  BOOST_CARDS,
  FARM_LEVEL_PRICES,
  LEVEL_PRICES,
  UPGRADE_CARDS,
} from '../lib';
import { useBackButton, useBoost, useUser } from '../../../shared';
import { Card } from '../types';
import { useBuyFarm, useUpdateBoost, useUpgradeLevel } from '../../../entities';

export const GameUpgradePage = () => {
  const { user } = useUser();
  const { isActive } = useBoost();

  useBackButton();

  const [selectedUpgradeCard, setSelectedUpgradeCard] = useState<
    (Card & { price: number }) | null
  >(null);

  const [selectedBoostCard, setSelectedBoostCard] = useState<
    (Card & { price: number; amount: number }) | null
  >(null);

  const { updateBoostMutation, isPending: isBoostPending } = useUpdateBoost(
    () => setSelectedBoostCard(null),
  );

  const { mutate: upgradeLevelMutation, isPending: isUpgradePending } =
    useUpgradeLevel(() => setSelectedUpgradeCard(null));
  const { mutate: buyFarmMutation, isPending: isBuyFarmPending } = useBuyFarm(
    () => setSelectedUpgradeCard(null),
  );

  return (
    <div className="relative h-full w-full overflow-y-auto overflow-x-hidden scrollbar">
      <img
        className="absolute !h-[350px] !w-[412px] right-[-97px] top-[-184px] -z-10"
        src={window.location.origin + '/spheres.png'}
        alt="image"
      />

      <div className="relative h-fit w-full px-[25px] mt-[30px] mb-[90px] flex flex-col justify-start items-center gap-10">
        <Balance balance={user!.balance} />

        <div className="w-full flex flex-col justify-center items-center gap-5">
          <CardContainer
            title="Boosts"
            content={BOOST_CARDS.map((item, index) => {
              const titleStarts = item.title.split(' ')[0];
              let amount: number;
              if (titleStarts === 'Fuel') {
                amount = user!.fuelboostQuantity;
              } else {
                amount = user!.tapboostQuantity;
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
                  ? user!.fuelLevel
                  : titleStarts === 'Rocket'
                    ? user!.tapLevel
                    : user!.farmLevel;

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
          <UpgradePopup
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
          <UpgradePopup
            key={`popup-${selectedUpgradeCard.title}`}
            card={selectedUpgradeCard}
            onUpgrade={() => {
              const levelType =
                selectedUpgradeCard.title.split(' ')[0] === 'Fuel'
                  ? 'fuel'
                  : selectedUpgradeCard.title.split(' ')[0] === 'Rocket'
                    ? 'tap'
                    : 'farm';

              if (levelType === 'farm' && user?.farmLevel === 0) {
                buyFarmMutation();
              } else {
                upgradeLevelMutation({
                  type: levelType,
                });
              }
            }}
            isRequestPending={isUpgradePending || isBuyFarmPending}
            onExit={() => setSelectedUpgradeCard(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
