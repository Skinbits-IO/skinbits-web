import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { updateUserBalance } from '../../../store/slices/userSlice';
import {
  updateBalanceEarned,
  updateTotalTaps,
} from '../../../store/slices/game/gameSessionSlice';
import { useAmo, useUserGameInfo } from '../../../shared';

export const useSuperRocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUserGameInfo();
  const { amo, maxAmo } = useAmo();

  const [activeSuperRocket, setActiveSuperRocket] = useState<boolean>(false);
  const [superRocketIndicators, setSuperRocketIndicators] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    if (amo % (50 * user!.tapLevel) === 0 && amo !== 0 && amo !== maxAmo) {
      setActiveSuperRocket(true);
      setTimeout(() => setActiveSuperRocket(false), 3000);
    }
  }, [amo]);

  const handleSuperRocketClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    dispatch(updateUserBalance(user!.tapLevel));

    dispatch(updateTotalTaps(1));
    dispatch(updateBalanceEarned(user!.tapLevel));

    const indicatorId = Date.now() + Math.random();
    setSuperRocketIndicators((prev) => [...prev, { id: indicatorId, x, y }]);

    setTimeout(() => {
      setSuperRocketIndicators((prev) =>
        prev.filter((ind) => ind.id !== indicatorId)
      );
    }, 500);
  };

  return { activeSuperRocket, superRocketIndicators, handleSuperRocketClick };
};
