import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
  addAmo,
  reduceAmo,
  setAmo,
  setMaxAmo,
} from '../../../store/slices/game/amoSlice';
import { updateUserBalance } from '../../../store/slices/userSlice';
import {
  updateBalanceEarned,
  updateTotalTaps,
} from '../../../store/slices/game/gameSessionSlice';
import { RocketPosition } from '../types';
import { computeGrid, generatePosition, markArea } from '../utils';
import { useAmo, useBoost, useUserGameInfo } from '../../../shared';
import { useGameContext } from '../context';

export const useRocket = (
  gameRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUserGameInfo();
  const { amo, maxAmo } = useAmo();
  const { isActive, type } = useBoost();
  const { setSuperRocketBuffer } = useGameContext();

  const regenerationInterval = useRef<NodeJS.Timeout | null>(null);
  const amoRef = useRef<number>(amo);
  useEffect(() => {
    amoRef.current = amo;
  }, [amo]);

  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const flyingIndicators = useRef<Map<number, RocketPosition>>(new Map());

  const handleRocketClick = (position: RocketPosition, index: number) => {
    const newAmo = amo - user!.tapLevel;
    const fuelBoost = isActive && type === 'fuelboost';

    if (newAmo >= 0 || fuelBoost) {
      if (!fuelBoost) dispatch(reduceAmo(user!.tapLevel));

      const earnedRockets =
        isActive && type === 'tapboost' ? user!.tapLevel * 10 : user!.tapLevel;
      dispatch(updateUserBalance(earnedRockets));
      setSuperRocketBuffer((prev) => (prev += earnedRockets));

      dispatch(updateTotalTaps(1));
      dispatch(updateBalanceEarned(earnedRockets));

      const newRocketPosition = generatePosition(gameRef);
      const updatedPositions = rocketPositions.map((pos, i) =>
        i === index ? newRocketPosition : pos
      );

      markArea(position, false);
      setRocketPositions(updatedPositions);

      flyingIndicators.current.set(index, { ...position });

      setTimeout(() => {
        flyingIndicators.current.delete(index);
      }, 500);

      // Start regeneration if amo is 0
      if (regenerationInterval.current === null && newAmo === 0) {
        regenerationInterval.current = setInterval(() => {
          if (amoRef.current < maxAmo) {
            dispatch(addAmo(user!.fuelLevel));
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    computeGrid(gameRef);
    const positions: RocketPosition[] = [];
    for (let i = 0; i < 3; i++) {
      positions.push(generatePosition(gameRef));
    }
    setRocketPositions(positions);

    const amo = 1000 + (user!.fuelLevel - 1) * 500;
    dispatch(setAmo(amo));
    dispatch(setMaxAmo(amo));

    return () => {
      clearInterval(regenerationInterval.current!);
      regenerationInterval.current = null;
    };
  }, []);

  return { rocketPositions, flyingIndicators, handleRocketClick };
};
