import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { updateUserBalance } from '../../../store/slices/userSlice';
import {
  updateBalanceEarned,
  updateTotalTaps,
} from '../../../store/slices/game/gameSessionSlice';
import { useBoost, useUserGameInfo } from '../../../shared';
import { useGameContext } from '../context';

export const useSuperRocket = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUserGameInfo();
  const { isActive, type } = useBoost();

  const { superRocketBuffer, setSuperRocketBuffer } = useGameContext();
  const [activeSuperRocket, setActiveSuperRocket] = useState<boolean>(false);
  const [superRocketIndicators, setSuperRocketIndicators] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    if (
      superRocketBuffer % (100 * Math.floor(Math.log2(user!.fuelLevel))) ===
      0
    ) {
      setActiveSuperRocket(true);
      setTimeout(() => {
        setActiveSuperRocket(false);
        setSuperRocketBuffer(0);
      }, 5000);
    }
  }, [superRocketBuffer]);

  const handleSuperRocketClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const earnedRockets =
      isActive && type === 'tapboost' ? user!.tapLevel * 10 : user!.tapLevel;
    dispatch(updateUserBalance(earnedRockets));

    dispatch(updateTotalTaps(1));
    dispatch(updateBalanceEarned(earnedRockets));

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
