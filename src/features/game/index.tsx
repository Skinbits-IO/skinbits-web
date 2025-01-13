import { useState, useEffect, useRef } from 'react';
import styles from './GameWidget.module.css';
import { Lighting } from './UI/Lighting';
import { UpgradeButton } from './UI/UpgradeButton';
import { GameRocketIcon } from '../../components';
import { generatePositions } from './utils/rocketPositioning';

export const GameWidget = () => {
  const [amo, setAmo] = useState<number>(0);
  const [rocketPositions, setRocketPositions] = useState<
    { left: number; top: number }[]
  >([]);
  const gameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setAmo(100);
    generatePositions(gameRef, setRocketPositions);
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <span className={styles.amo}>
          <span className={styles.amoBold}>{amo}</span>
          <span>/500</span>
        </span>
        <div className={styles.game} ref={gameRef}>
          {rocketPositions.map((pos, index) => (
            <GameRocketIcon
              key={index}
              style={{
                position: 'absolute',
                left: `${pos.left}px`,
                top: `${pos.top}px`,
              }}
            />
          ))}
        </div>
        <UpgradeButton />
      </div>
      <Lighting left="3.375rem" top="8.875rem" />
      <Lighting left="14.375rem" top="18.75rem" />
    </div>
  );
};
