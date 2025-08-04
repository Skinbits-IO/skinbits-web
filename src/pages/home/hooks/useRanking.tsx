import { useEffect, useState } from 'react';
import { Rank, RANKS, useGameSession, useUser } from '../../../shared';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { setUserRank } from '../../../store/slices/userSlice';

export const useRanking = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useUser();
  const { gameSession } = useGameSession();

  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    const rank = RANKS.get(user.rank);
    const newTotalBalance = user.totalBalanceEarned + gameSession.balanceEarned;

    const lastRank = localStorage.getItem('rank');
    if (lastRank && lastRank !== user.rank) {
      dispatch(setUserRank(lastRank as Rank));
      setShowNewRankPopup(true);
    }
    localStorage.setItem('rank', user.rank);

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
