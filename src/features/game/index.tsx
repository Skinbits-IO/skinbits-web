import { useState, useEffect, useRef } from 'react';
import styles from './GameWidget.module.css';
import { Lighting } from './UI/Lighting';
import { UpgradeButton } from './UI/UpgradeButton';
import { GameRocketIcon } from '../../components';
import {
  computeGrid,
  generatePosition,
  removeRocketPosition,
} from './utils/rocketPositioning';
import { RocketPosition } from './types/RocketPosition';

export const GameWidget = () => {
  const rocketSize = 44;
  //const [balance, setBalance] = useState<number>(0);
  const [amo, setAmo] = useState<number>(0);

  const gameRef = useRef<HTMLDivElement | null>(null);
  const [rocketPositions, setRocketPositions] = useState<RocketPosition[]>([]);
  const [flyingRocketIndexes, setFlyingRocketIndexes] = useState<number[]>([]);
  const [plusOnePositions, setPlusOnePositions] = useState<
    Map<number, RocketPosition>
  >(new Map<number, RocketPosition>());

  useEffect(() => {
    setAmo(100);

    computeGrid(gameRef, rocketSize);

    const positions: RocketPosition[] = [];
    for (let i = 0; i < 3; i++) {
      const rocketPosition = generatePosition(gameRef, rocketSize);
      positions.push(rocketPosition);
    }

    setRocketPositions(positions);
  }, []);

  const handleRocketClick = (index: number) => {
    const clickedPosition = rocketPositions[index];

    // Show "+1" at the rocket's position
    setPlusOnePositions((prep) => {
      prep.set(index, clickedPosition);
      return prep;
    });

    // Mark the clicked rocket as flying
    setFlyingRocketIndexes((prep) => {
      prep.push(index);
      return prep;
    });

    let positions = rocketPositions;
    const newRocketPosition = generatePosition(gameRef, rocketSize);
    positions.push(newRocketPosition);

    setRocketPositions(positions);

    // Remove it after the animation ends
    setTimeout(() => {
      removeRocketPosition(clickedPosition, rocketSize);
      positions.splice(index, 1);
      setRocketPositions(positions);

      setFlyingRocketIndexes((prep) => {
        prep.splice(index, 1);
        return prep;
      });
      setPlusOnePositions((prep) => {
        prep.delete(index);
        return prep;
      });
    }, 400); // Duration of the animation
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <span className={styles.amo}>
          <span className={styles.amoBold}>{amo}</span>
          <span>/500</span>
        </span>
        <div className={styles.game} ref={gameRef}>
          {rocketPositions.map((pos, index) => (
            <div
              key={index}
              className={`${styles.rocket} ${
                index === flyingRocketIndexes[flyingRocketIndexes.length - 1]
                  ? styles['fly-away']
                  : ''
              }`}
              style={{
                left: `${pos.left}px`,
                top: `${pos.top}px`,
              }}
              onClick={() => handleRocketClick(index)}
            >
              <GameRocketIcon />
              <div
                className={styles.plusOne}
                style={{
                  left: `${plusOnePositions.get(index)?.left}px`,
                  top: `${plusOnePositions.get(index)?.top}px`,
                }}
              >
                +1
              </div>
            </div>
          ))}
        </div>
        <UpgradeButton />
      </div>
      <Lighting left="3.375rem" top="8.875rem" />
      <Lighting left="14.375rem" top="18.75rem" />
    </div>
  );
};
