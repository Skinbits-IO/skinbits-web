import { useEffect, useRef, useState } from 'react';
import { useAmo, useUserGameInfo } from '../state';
import { RocketPosition } from '../../types';
import { computeGrid, generatePosition, markArea } from '../../utils';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { addAmo, reduceAmo, setMaxAmo } from '../../state/game/amoSlice';
import { updateUserBalance } from '../../state/userSlice';

export const useRocket = (
  gameRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUserGameInfo();
  const { amo, maxAmo } = useAmo();

  const amoRef = useRef<number>(amo);
  const regenerationInterval = useRef<NodeJS.Timeout | null>(null);

  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const flyingIndicators = useRef<Map<number, RocketPosition>>(new Map());

  const handleRocketClick = (position: RocketPosition, index: number) => {
    const newAmo = amo - user!.tapLevel;

    if (newAmo >= 0) {
      dispatch(reduceAmo(user!.tapLevel));
      dispatch(updateUserBalance(user!.tapLevel));

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
    dispatch(setMaxAmo(1000 + (user!.fuelLevel - 1) * 500));

    return () => {
      clearInterval(regenerationInterval.current!);
      regenerationInterval.current = null;
    };
  }, []);

  useEffect(() => {
    amoRef.current = amo;
  }, [amo]);

  return { rocketPositions, flyingIndicators, handleRocketClick };
};
