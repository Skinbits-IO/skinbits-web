import { useEffect, useState } from 'react';
import {
  RankEnum,
  RANKS,
  useAppDispatch,
  useGameSession,
  useUser,
} from '../../../shared';
import { setUserRank } from '../../../entities';

export const useRanking = () => {
  const dispatch = useAppDispatch();

  const { user } = useUser();
  const { gameSession } = useGameSession();

  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;
    const rank = RANKS.get(user.rank);
    const newTotalBalance = user.totalBalanceEarned + gameSession.balanceEarned;

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
  }, [user, gameSession]);

  return {
    showNewRankPopup,
    setShowNewRankPopup,
  };
};
