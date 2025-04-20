import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { ranks } from '../constants';

export const useRanking = () => {
  const user = useSelector((state: RootState) => state.user);

  const [showRankingSystem, setShowRankingSystem] = useState<boolean>(false);
  const [showNewRankPopup, setShowNewRankPopup] = useState<boolean>(false);

  useEffect(() => {
    const rank = ranks.get(user.rank);
    if (rank) {
      if (rank.milestone === user.balance && rank.nextRank) {
        setShowNewRankPopup(true);
      }
    }
  }, [user.balance]);

  useEffect(() => {
    if (showRankingSystem) {
      WebApp.ready();

      const backButton = WebApp.BackButton;
      const handleBackButtonClick = () => {
        setShowRankingSystem(false);
      };

      backButton.show();
      backButton.onClick(handleBackButtonClick);

      return () => {
        backButton.hide();
        backButton.offClick(handleBackButtonClick);
      };
    }
  }, [showRankingSystem]);

  return {
    showRankingSystem,
    showNewRankPopup,
    setShowRankingSystem,
    setShowNewRankPopup,
  };
};
