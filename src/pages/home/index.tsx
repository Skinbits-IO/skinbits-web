import styles from './HomePage.module.css';
import { FarmButton, FarmCancelPopup, GameWidget } from '../../features';
import { AnimatePresence } from 'framer-motion';
import { Header } from '../../widgets';
import { RankingPopup, SubscriptionPopup, Wallet } from './ui';
import { useNavigate } from 'react-router';
import { useRanking, useSubscription } from './hooks';
import { Rank, RankEnum, RANKS, useAppDispatch, useUser } from '../../shared';
import { useState } from 'react';
import { setUserRank } from '../../entities';

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
    <div className={styles.background}>
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
      <div className={styles.upperSection}>
        <Rank
          rank={user!.rank as RankEnum}
          onClick={() => navigate('/ranking')}
        />
        <Wallet balance={user!.balance} />
      </div>
      <div className={styles.game}>
        <GameWidget />
        <FarmButton
          openPopup={() => setShowFarmCancelPopup(!showFarmCancelPopup)}
        />
      </div>
    </div>
  );
};
