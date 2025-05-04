import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';
import { GameWidget, NotificationWidget } from '../../features';
import { FarmButton } from './UI/farm-button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressWidget } from './UI/progress-widget';
import { RankingPage } from '../ranking';
import { useRanking, useUser, useUserGameInfo } from '../../hooks';
import { RankingPopup } from './UI/ranking-popup';
import { setUserRank } from '../../state/userSlice';
import { ranks } from '../../constants';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const {
    showRankingSystem,
    showNewRankPopup,
    setShowRankingSystem,
    setShowNewRankPopup,
  } = useRanking();

  return (
    <div className={styles.background}>
      <AnimatePresence>
        {showNotifications && (
          <NotificationWidget
            key="notification-widget"
            onClose={() => setShowNotifications(false)}
          />
        )}
        {showNewRankPopup && (
          <RankingPopup
            key="ranking-popup"
            rank={user!.rank}
            onClose={() => {
              const rank = ranks.get(user!.rank);
              if (rank && rank.nextRank) {
                dispatch(setUserRank(rank.nextRank));
              }
              setShowNewRankPopup(false);
            }}
          />
        )}
      </AnimatePresence>
      <Header
        name={user!.username}
        photoUrl={user!.photoUrl}
        onNotification={() => setShowNotifications(true)}
      />
      <div className={styles.upperSection}>
        <Rank
          rank={user!.rank}
          onClick={() => setShowRankingSystem(!showRankingSystem)}
        />
        {showRankingSystem ? (
          <ProgressWidget rank={user!.rank} totalEarned={user!.totalEarned} />
        ) : (
          <Wallet balance={user!.balance} />
        )}
      </div>
      {showRankingSystem ? (
        <RankingPage />
      ) : (
        <div className={styles.game}>
          <GameWidget />
          <FarmButton
            progress={
              100 * ((userGameInfo!.tapLevel + userGameInfo!.fuelLevel) / 10)
            }
            status="unavailable"
          />
        </div>
      )}
    </div>
  );
};
