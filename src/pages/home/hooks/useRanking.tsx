import { useEffect, useState } from 'react';
import { RANKS, useGameSession, useUser } from '../../../shared';

export const useRanking = () => {
  const { user } = useUser();
  const { gameSession } = useGameSession();
  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    const rank = RANKS.get(user.rank);
    const newTotalBalance = user.totalBalanceEarned + gameSession.balanceEarned;
    if (rank) {
      if (rank.milestone === newTotalBalance && rank.nextRank) {
        setShowNewRankPopup(true);
      }
    }
  }, [user, gameSession]);

  return {
    showNewRankPopup,
    setShowNewRankPopup,
  };
};
