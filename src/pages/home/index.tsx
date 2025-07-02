import styles from './HomePage.module.css';
import { GameWidget } from '../../features';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { AnimatePresence } from 'framer-motion';
import { setUserRank } from '../../store/slices/userSlice';
import { Header, Rank } from '../../components';
import { FarmButton, RankingPopup, Wallet } from './UI';
import { useNavigate } from 'react-router';
import { useRanking } from './hooks';
import {
  Rank as RankEnum,
  RANKS,
  useUser,
  useUserGameInfo,
} from '../../shared';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();
  const { showNewRankPopup, setShowNewRankPopup } = useRanking();

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
          progress={
            100 * ((userGameInfo!.tapLevel + userGameInfo!.fuelLevel) / 10)
          }
        />
      </div>
    </div>
  );
};
