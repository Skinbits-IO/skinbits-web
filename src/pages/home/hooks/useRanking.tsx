import { useEffect, useState } from 'react';
import { RANKS, useUser } from '../../../shared';

export const useRanking = () => {
  const { user } = useUser();
  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    const rank = RANKS.get(user!.rank);
    if (rank) {
      if (rank.milestone === user!.balance && rank.nextRank) {
        setShowNewRankPopup(true);
      }
    }
  }, [user!.balance]);

  return {
    showNewRankPopup,
    setShowNewRankPopup,
  };
};
