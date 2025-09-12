import { useEffect, useState } from 'react';
import { useAppDispatch, useBoost, useUser } from '../../../shared';
import { useGameContext } from '../context';
import { updateUserBalance } from '../../../entities';

export const useSuperRocket = () => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const { isActive, type } = useBoost();

  const { superRocketBuffer, setSuperRocketBuffer } = useGameContext();
  const [activeSuperRocket, setActiveSuperRocket] = useState<boolean>(false);
  const [superRocketIndicators, setSuperRocketIndicators] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    if (
      superRocketBuffer % (100 * Math.floor(Math.log2(user!.fuelLevel))) <
        user!.tapLevel &&
      superRocketBuffer !== 0
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
      user!.tapLevel * (isActive && type === 'tapboost' ? 2 : 1);
    dispatch(updateUserBalance(earnedRockets));

    const indicatorId = Date.now() + Math.random();
    setSuperRocketIndicators((prev) => [...prev, { id: indicatorId, x, y }]);

    setTimeout(() => {
      setSuperRocketIndicators((prev) =>
        prev.filter((ind) => ind.id !== indicatorId),
      );
    }, 500);
  };

  return { activeSuperRocket, superRocketIndicators, handleSuperRocketClick };
};
