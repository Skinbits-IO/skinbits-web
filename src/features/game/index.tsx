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

export const GameWidget = () => {
  const rocketSize = 44;
  const [amo, setAmo] = useState<number>(0);
  const gameRef = useRef<HTMLDivElement | null>(null);
  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const [flyingRockets, setFlyingRockets] = useState<
    Map<number, RocketPosition>
  >(new Map());

  useEffect(() => {
    setAmo(100);

    computeGrid(gameRef, rocketSize);

    const positions: RocketPosition[] = [];
    for (let i = 0; i < 4; i++) {
      const rocketPosition = generatePosition(gameRef, rocketSize);
      positions.push(rocketPosition);
    }

    setRocketPositions(positions);
  }, []);

  const handleRocketClick = (position: RocketPosition, index: number) => {
    let positions = [...rocketPositions];
    const newRocketPosition = generatePosition(gameRef, rocketSize);
    positions.splice(positions.indexOf(position), 1, newRocketPosition);

    // Set flying rocket position
    const newFlyingRockets = new Map(flyingRockets);
    newFlyingRockets.set(index, { ...position });

    markArea(position, rocketSize, false);
    setRocketPositions(positions);
    setFlyingRockets(newFlyingRockets);

    setTimeout(() => {
      const updatedFlyingRockets = new Map(flyingRockets);
      updatedFlyingRockets.delete(index);
      setFlyingRockets(updatedFlyingRockets);
    }, 400);
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <span className={styles.amo}>
          <span className={styles.amoBold}>{amo}</span>
          <span>/500</span>
        </span>
        <div className={styles.game} ref={gameRef}>
          <AnimatePresence>
            {rocketPositions.map((pos, index) => (
              <div key={index}>
                <motion.div
                  key={index}
                  initial={{
                    x: pos.left,
                    y: pos.top,
                    position: 'absolute',
                  }}
                  animate={{
                    x: pos.left,
                    y: pos.top,
                  }}
                  exit={{
                    x: 30,
                    y: -30,
                    opacity: 0,
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
                    +1
                  </motion.div>
                )}
              </div>
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
