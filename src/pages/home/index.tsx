import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';
import { GameWidget, NotificationWidget } from '../../features';
import { FarmButton } from './UI/farm-button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressWidget } from './UI/progress-widget';
import { RankingPage } from '../ranking';
import { useRanking } from '../../hooks';
import { RankingPopup } from './UI/ranking-popup';
import { setUserRank } from '../../state/user/userSlice';
import { ranks } from '../../constants';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  /*const mutation = useMutation({
    mutationFn: addUserPostData,
    onSuccess: (data) => {
      console.log('Post successful:', data);
    },
    onError: (error) => {
      console.error('Post failed:', error.message);
    },
  });*/

  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const {
    showRankingSystem,
    showNewRankPopup,
    setShowRankingSystem,
    setShowNewRankPopup,
  } = useRanking();

  useEffect(() => {
    /*mutation.mutate({
      hash: 'ae8050695d65c3191a05e0cd1a0767c41b6af284e3c7c09e5a35fdc08b93ff86',
      telegramId: 1111111111,
      firstName: 'vvvvv',
      lastName: 'G',
      username: 'slavon',
      languageCode: 'EN',
      isPremium: false,
      photoUrl: '5i42-rkeo',
    });*/
  }, []);

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
            rank={user.rank}
            onClose={() => {
              const rank = ranks.get(user.rank);
              if (rank && rank.nextRank) {
                dispatch(setUserRank(rank.nextRank));
              }
              setShowNewRankPopup(false);
            }}
          />
        )}
      </AnimatePresence>
      <Header
        name={user.name}
        photoUrl={user.photoUrl}
        onNotification={() => setShowNotifications(true)}
      />
      <div className={styles.upperSection}>
        <Rank
          rank={user.rank}
          onClick={() => setShowRankingSystem(!showRankingSystem)}
        />
        {showRankingSystem ? (
          <ProgressWidget rank={user.rank} />
        ) : (
          <Wallet balance={user.balance} />
        )}
      </div>
      {showRankingSystem ? (
        <RankingPage />
      ) : (
        <div className={styles.game}>
          <GameWidget />
          <FarmButton
            progress={100 * ((user.tapLevel + user.fuelLevel) / 10)}
            status="unavailable"
          />
        </div>
      )}
    </div>
  );
};
