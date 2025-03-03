import { useState, useEffect, useRef } from 'react';
import styles from './GameWidget.module.css';
import { UpgradeButton } from './UI/UpgradeButton';
import { GameRocketIcon } from '../../components';
import {
  computeGrid,
  generatePosition,
  markArea,
} from './utils/rocketPositioning';
import { RocketPosition } from './types/RocketPosition';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { addAmo, reduceAmo } from '../../state/game/amoSlice';
import { updateUserBalance } from '../../state/user/userSlice';
import { SuperRocket } from './UI/SuperRocket';

export const GameWidget = () => {
  const dispatch = useDispatch<AppDispatch>();

  // User
  const user = useSelector((state: RootState) => state.user);

  // Amo (Ammo)
  const amo = useSelector((state: RootState) => state.amo.value);
  const maxAmo = useSelector((state: RootState) => state.amo.max);

  const amoRef = useRef(amo);
  const regenerationInterval = useRef<NodeJS.Timeout | null>(null);

  // Rockets
  const gameRef = useRef<HTMLDivElement | null>(null);
  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const flyingIndicators = useRef<Map<number, RocketPosition>>(new Map());

  // Super rocket state and its indicators (with tap positions)
  const [activeSuperRocket, setActiveSuperRocket] = useState<boolean>(false);
  const [superRocketIndicators, setSuperRocketIndicators] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    computeGrid(gameRef);
    const positions: RocketPosition[] = [];
    for (let i = 0; i < 3; i++) {
      positions.push(generatePosition(gameRef));
    }
    setRocketPositions(positions);

    return () => {
      setActiveSuperRocket(false);
      clearInterval(regenerationInterval.current!);
      regenerationInterval.current = null;
    };
  }, []);

  useEffect(() => {
    amoRef.current = amo;
  }, [amo]);

  const handleRocketClick = (position: RocketPosition, index: number) => {
    const newAmo = amo - user.tapLevel;

    if (newAmo >= 0) {
      dispatch(reduceAmo(user.tapLevel));
      dispatch(updateUserBalance(user.tapLevel));

      if (newAmo % 10 === 0) {
        setActiveSuperRocket(true);
        setTimeout(() => setActiveSuperRocket(false), 5000);
        return;
      }

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
            dispatch(addAmo(1));
          }
        }, 1000);
      }
    }
  };

  const handleSuperRocketClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Dispatch balance update (or any other action).
    dispatch(updateUserBalance(user.tapLevel * 10));

    // Create a new indicator at the tap position.
    const indicatorId = Date.now() + Math.random();
    setSuperRocketIndicators((prev) => [...prev, { id: indicatorId, x, y }]);

    setTimeout(() => {
      setSuperRocketIndicators((prev) =>
        prev.filter((ind) => ind.id !== indicatorId)
      );
    }, 500);
  };

  return (
    <div className={styles.background}>
      <span className={styles.amo}>
        <span className={styles.amoBold}>{amo}</span>
        <span>/{maxAmo}</span>
      </span>
      <div className={styles.game} ref={gameRef}>
        <AnimatePresence>
          {!activeSuperRocket &&
            rocketPositions.map((pos, index) => (
              <motion.div key={index}>
                <motion.div
                  className={styles.rocket}
                  initial={{
                    transform: `translate(${pos.left}px, ${pos.top}px)`,
                  }}
                  animate={{
                    transform: `translate(${pos.left}px, ${pos.top}px)`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  onClick={() => handleRocketClick(pos, index)}
                >
                  <GameRocketIcon size={44} />
                </motion.div>
                {flyingIndicators.current.has(index) && (
                  <motion.div
                    key={`plus-one-${index}`}
                    className={styles.plusOne}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      left: `${flyingIndicators.current.get(index)!.left}px`,
                      top: `${flyingIndicators.current.get(index)!.top}px`,
                    }}
                  >
                    +{user.tapLevel}
                  </motion.div>
                )}
              </motion.div>
            ))}
          {activeSuperRocket && (
            <SuperRocket
              user={user}
              superRocketIndicators={superRocketIndicators}
              handleSuperRocketClick={handleSuperRocketClick}
            />
          )}
        </AnimatePresence>
      </div>
      <UpgradeButton />
    </div>
  );
};
