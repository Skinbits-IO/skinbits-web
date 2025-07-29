import styles from './HomePage.module.css';
import { GameWidget } from '../../features';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { AnimatePresence } from 'framer-motion';
import { setUserRank } from '../../store/slices/userSlice';
import { Header, Rank } from '../../components';
import { FarmButton, FarmCancelPopup, RankingPopup, Wallet } from './UI';
import { useNavigate } from 'react-router';
import { useFarmState, useRanking } from './hooks';
import {
  FarmStatus,
  Rank as RankEnum,
  RANKS,
  useUser,
  useUserGameInfo,
} from '../../shared';
import { useQuery } from '@tanstack/react-query';
import { checkFarmAvailability, getFarmingStatus } from './api';
import { FarmButtonSkeleton } from './UI/farm-button-skeleton';
import { useEffect, useState } from 'react';
import {
  setFarmFetched,
  setFarmingSession,
  setFarmingStatus,
} from '../../store/slices/game/farmSlice';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useUser();
  const { user: userGameInfo } = useUserGameInfo();
  const { showNewRankPopup, setShowNewRankPopup } = useRanking();
  const { fetched } = useFarmState();

  const [showFarmCancelPopup, setShowFarmCancelPopup] =
    useState<boolean>(false);

  const { data: availableData, isPending: isPendingFarm } = useQuery({
    queryKey: ['farm-availability'],
    queryFn: () => checkFarmAvailability(),
    retry: 0,
    staleTime: Infinity,
  });

  const { data: claimData, isPending: isPendingClaim } = useQuery({
    queryKey: ['farming-status'],
    queryFn: () => getFarmingStatus(),
    retry: 0,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (fetched) return;
    if (availableData && claimData) dispatch(setFarmFetched(true));

    if (availableData) {
      dispatch(setFarmingStatus(FarmStatus.Inactive));
    } else if (!availableData && userGameInfo?.farmLevel !== 0) {
      dispatch(setFarmingStatus(FarmStatus.Active));
    }

    if (claimData) {
      if (claimData.canClaim) dispatch(setFarmingStatus(FarmStatus.Claim));
      if (claimData.session) dispatch(setFarmingSession(claimData.session));
    }
  }, [fetched, claimData, availableData]);

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
        {!isPendingFarm || !isPendingClaim ? (
          <FarmButton
            progress={100 * (user!.balance / 250000)}
            openPopup={() => setShowFarmCancelPopup(!showFarmCancelPopup)}
          />
        ) : (
          <FarmButtonSkeleton />
        )}
      </div>
    </div>
  );
};
