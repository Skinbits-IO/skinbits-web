import { useEffect, useRef, useState } from 'react';
import { RocketPosition } from '../types';
import { computeGrid, generatePosition, markArea } from '../utils';
import { useAppDispatch, useAppSelector, useUser } from '../../../shared';
import { useGameContext } from '../context';
import { updateUserBalance } from '../../../entities';
import { useProcessRockets } from './useProcessRockets';

export const useRocket = (
  gameRef: React.MutableRefObject<HTMLDivElement | null>,
) => {
  const dispatch = useAppDispatch();

  const { user, tokens } = useUser();
  const { isActive, type } = useAppSelector((state) => state.boost);
  const {
    amo,
    setAmo,
    setMaxAmo,
    socketRef,
    isRocketPending,
    setIsRocketPending,
    setSuperRocketBuffer,
  } = useGameContext();
  const { currentProcessedItemRef, processingQueueRef } = useProcessRockets();

  const regenerationInterval = useRef<NodeJS.Timeout | null>(null);
  const amoRef = useRef<number>(amo.current);
  useEffect(() => {
    amoRef.current = amo.current;
  }, [amo.current]);

  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const flyingIndicators = useRef<Map<number, RocketPosition>>(new Map());

  const handleRocketClick = (position: RocketPosition, index: number) => {
    if (!tokens || tokens.tapToken === null || !socketRef.current) return;

    const newItem = {
      socketFunction: (tapToken: string) => socketAddRocketRequest(tapToken),
      stateUpdateFunction: () => updateRocketsState(position, index),
    };

    if (isRocketPending) {
      processingQueueRef.current.push(newItem);
    } else {
      currentProcessedItemRef.current = newItem;
      socketAddRocketRequest(tokens.tapToken);
    }
  };

  const socketAddRocketRequest = (tapToken: string) => {
    const newAmo = amo.current - user!.tapLevel;
    const fuelBoost = isActive && type === 'fuelboost';

    if (newAmo >= 0 || fuelBoost) {
      socketRef.current!.emit('tap', { tapToken });
      setIsRocketPending(true);
    }
  };

  const updateRocketsState = (position: RocketPosition, index: number) => {
    const newAmo = amo.current - user!.tapLevel;
    const fuelBoost = isActive && type === 'fuelboost';

    if (newAmo >= 0 || fuelBoost) {
      if (!fuelBoost) setAmo((prev: number) => prev - user!.tapLevel);

      const earnedRockets =
        user!.tapLevel * (isActive && type === 'tapboost' ? 2 : 1);
      dispatch(updateUserBalance(earnedRockets));
      setSuperRocketBuffer((prev) => (prev += earnedRockets));

      const newRocketPosition = generatePosition(gameRef);
      const updatedPositions = rocketPositions.map((pos, i) =>
        i === index ? newRocketPosition : pos,
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
          if (amoRef.current < amo.max) {
            setAmo((prev: number) => prev + user!.fuelLevel);
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
    setAmo(amo);
    setMaxAmo(amo);

    return () => {
      clearInterval(regenerationInterval.current!);
      regenerationInterval.current = null;
    };
  }, []);

  return { rocketPositions, flyingIndicators, handleRocketClick };
};
