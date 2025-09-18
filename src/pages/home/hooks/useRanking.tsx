import { useEffect, useState } from 'react';
import { RankEnum, RANKS, useAppDispatch, useUser } from '../../../shared';
import { setUserRank } from '../../../entities';

export const useRanking = () => {
  const dispatch = useAppDispatch();

  const { user } = useUser();
  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    const rank = RANKS.get(user.rank);
    const newTotalBalance = user.balance;

    const lastRank = localStorage.getItem('rank');
    if (lastRank && lastRank !== user.rank) {
      dispatch(setUserRank(lastRank as RankEnum));
      setShowNewRankPopup(true);
    }
    localStorage.setItem('rank', user.rank);

    if (rank) {
      if (rank.milestone === newTotalBalance && rank.nextRank) {
        setShowNewRankPopup(true);
      }
    }
  }, [user]);

  return {
    showNewRankPopup,
    setShowNewRankPopup,
  };
};
