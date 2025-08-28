import { FarmButton, FarmCancelPopup, GameWidget } from '../../../features';
import { AnimatePresence } from 'framer-motion';
import { Header } from '../../../widgets';
import { useNavigate } from 'react-router';
import { useRanking, useSubscription } from '../hooks';
import {
  Rank,
  RankEnum,
  RANKS,
  useAppDispatch,
  useUser,
} from '../../../shared';
import { useState } from 'react';
import { setUserRank } from '../../../entities';
import { SubscriptionPopup } from './subscription-popup';
import { RankingPopup } from './ranking-popup';
import { Wallet } from './wallet';

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user } = useUser();
  const { showNewRankPopup, setShowNewRankPopup } = useRanking();
  const { show: showSubscription, setShow: setShowSubscription } =
    useSubscription();

  const [showFarmCancelPopup, setShowFarmCancelPopup] =
    useState<boolean>(false);

  return (
    <div className="relative flex h-full w-[calc(100%-1.875rem)] flex-col items-center justify-start gap-3.5 m-[0.9375rem] bg-transparent overflow-hidden">
      <AnimatePresence>
        {showNewRankPopup && (
          <RankingPopup
            key="ranking-popup"
            rank={user!.rank}
            onClose={() => {
              const rank = RANKS.get(user!.rank as RankEnum);
              if (rank && rank.nextRank) {
                dispatch(setUserRank(rank.nextRank));
              }
              setShowNewRankPopup(false);
            }}
          />
        )}
        {showFarmCancelPopup && (
          <FarmCancelPopup onClose={() => setShowFarmCancelPopup(false)} />
        )}
        {showSubscription && (
          <SubscriptionPopup onClose={() => setShowSubscription(false)} />
        )}
      </AnimatePresence>

      <Header />

      <div className="w-full grid grid-cols-[4.5rem_1fr] gap-[0.8125rem]">
        <Rank
          rank={user!.rank as RankEnum}
          onClick={() => navigate('/ranking')}
        />
        <Wallet balance={user!.balance} />
      </div>

      <div className="flex-shrink h-full w-full grid grid-rows-[1fr_3.4375rem] gap-2.5 mb-24">
        <GameWidget />
        <FarmButton
          openPopup={() => setShowFarmCancelPopup(!showFarmCancelPopup)}
        />
      </div>
    </div>
  );
};
