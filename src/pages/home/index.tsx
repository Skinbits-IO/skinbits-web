import styles from './HomePage.module.css';
import { GameWidget } from '../../features';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { AnimatePresence } from 'framer-motion';
import { setUserRank } from '../../store/slices/userSlice';
import { Header, Rank } from '../../components';
import { FarmButton, FarmCancelPopup, RankingPopup, Wallet } from './UI';
import { useNavigate } from 'react-router';
import { useRanking } from './hooks';
import { Rank as RankEnum, RANKS, useUser } from '../../shared';
import { useQuery } from '@tanstack/react-query';
import { checkClaimAvailability, checkFarmAvailability } from './api';
import { FarmStatus } from './types';
import { FarmButtonSkeleton } from './UI/farm-button-skeleton';
import { toIsoUtcNoMs } from './utils';
import { useState } from 'react';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user } = useUser();
  const { showNewRankPopup, setShowNewRankPopup } = useRanking();

  const [showFarmCancelPopup, setShowFarmCancelPopup] =
    useState<boolean>(false);

  const { data: availableData, isPending: isPendingFarm } = useQuery({
    queryKey: ['farm-availability'],
    queryFn: () => checkFarmAvailability(),
    retry: 0,
    staleTime: Infinity,
  });

  const { data: claimData, isPending: isPendingClaim } = useQuery({
    queryKey: ['farm-claim-availability'],
    queryFn: () => checkClaimAvailability(),
    retry: 0,
    staleTime: Infinity,
  });

  const getFarmStatus = (): FarmStatus => {
    console.log(claimData);
    if (claimData?.canClaim) {
      return FarmStatus.Claim;
    }

    if (availableData?.canFarm) {
      return FarmStatus.Inactive;
    } else if (!availableData?.canFarm) {
      return FarmStatus.Active;
    }

    return FarmStatus.Buy;
  };

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
            status={getFarmStatus()}
            progress={100 * (user!.balance / 250000)}
            endTime={
              availableData && availableData.endsAt
                ? availableData.endsAt
                : toIsoUtcNoMs()
            }
            openPopup={() => setShowFarmCancelPopup(!showFarmCancelPopup)}
          />
        ) : (
          <FarmButtonSkeleton />
        )}
      </div>
    </div>
  );
};
