import { useState, useEffect, useRef } from 'react';
import styles from './GameWidget.module.css';
import { Lighting } from './UI/Lighting';
import { UpgradeButton } from './UI/UpgradeButton';
import { GameRocketIcon } from '../../components';
import {
  computeGrid,
  generatePosition,
  markArea,
} from './utils/rocketPositioning';
import { RocketPosition } from './types/RocketPosition';
import { AnimatePresence, motion } from 'motion/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { addAmo, reduceAmo } from '../../state/game/amoSlice';

export const GameWidget = (props: {
  onRocketClick: (value: number) => void;
}) => {
  const rocketSize = 44;
  //Damage level index
  const damageLevelIndex = 1;

  const dispatch = useDispatch<AppDispatch>();

  //Amo
  const amo = useSelector((state: RootState) => state.amo.value);
  const maxAmo = useSelector((state: RootState) => state.amo.max);

  const amoRef = useRef(amo);
  const regenerationInterval = useRef<NodeJS.Timeout | null>(null);

  //Rockets
  const gameRef = useRef<HTMLDivElement | null>(null);
  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const [flyingRockets, setFlyingRockets] = useState<
    Map<number, RocketPosition>
  >(new Map());

  useEffect(() => {
    //Set up rockets
    computeGrid(gameRef, rocketSize);
    const positions: RocketPosition[] = [];
    for (let i = 0; i < 3; i++) {
      const rocketPosition = generatePosition(gameRef, rocketSize);
      positions.push(rocketPosition);
    }
    setRocketPositions(positions);

    return () => {
      clearInterval(regenerationInterval.current!);
      regenerationInterval.current = null;
    };
  }, []);

  useEffect(() => {
    amoRef.current = amo;
  }, [amo]);

  const handleRocketClick = (position: RocketPosition, index: number) => {
    if (amo - damageLevelIndex >= 0) {
      const newRocketPosition = generatePosition(gameRef, rocketSize);
      const updatedPositions = rocketPositions.map((pos, i) =>
        i === index ? newRocketPosition : pos
      );

      const updatedFlyingRockets = new Map(flyingRockets);
      updatedFlyingRockets.set(index, { ...position });

      markArea(position, rocketSize, false);

      setRocketPositions(updatedPositions);
      setFlyingRockets(updatedFlyingRockets);
      dispatch(reduceAmo(damageLevelIndex));
      props.onRocketClick(damageLevelIndex);

      setTimeout(() => {
        updatedFlyingRockets.delete(index);
        setFlyingRockets(new Map(updatedFlyingRockets));
      }, 400);

      if (
        regenerationInterval.current === null &&
        amo - damageLevelIndex === 0
      ) {
        regenerationInterval.current = setInterval(() => {
          if (amoRef.current < maxAmo) {
            dispatch(addAmo(10));
          }
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <span className={styles.amo}>
          <span className={styles.amoBold}>{amo}</span>
          <span>/{maxAmo}</span>
        </span>
        <div className={styles.game} ref={gameRef}>
          <AnimatePresence>
            {rocketPositions.map((pos, index) => (
              <motion.div key={index}>
                <motion.div
                  key={index}
                  style={{ position: 'absolute' }}
                  initial={{
                    transform: `translate(${pos.left}px, ${pos.top}px)`,
                  }}
                  animate={{
                    transform: `translate(${pos.left}px, ${pos.top}px)`,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: 'easeOut',
                  }}
                  onClick={() => handleRocketClick(pos, index)}
                >
                  <GameRocketIcon />
                </motion.div>
                {flyingRockets.has(index) && (
                  <motion.div
                    key={`plus-one-${index}`}
                    className={styles.plusOne}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{
                      left: `${flyingRockets.get(index)!.left}px`,
                      top: `${flyingRockets.get(index)!.top}px`,
                    }}
                  >
                    +{damageLevelIndex}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <UpgradeButton />
      </div>
      <Lighting left="3.375rem" top="8.875rem" />
      <Lighting left="14.375rem" top="18.75rem" />
    </div>
  );
};
