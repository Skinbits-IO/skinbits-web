import { useRef, useState, useEffect } from 'react';
import styles from './index.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useRocket, useSuperRocket } from '../hooks';
import { useBoost, useUser } from '../../../shared';
import { useGameContext } from '../context';
import { SuperRocket } from './SuperRocket';
import { UpgradeButton } from './UpgradeButton';
import { GameRocketIcon } from './GameRocketIcon';
import { useSocket } from '../../socket';
import { useActiveBoost } from '../../../entities';

export const GameWidget = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { amo } = useGameContext();
  const { isActive, type, endTime } = useBoost();

  const { rocketPositions, flyingIndicators, handleRocketClick } =
    useRocket(gameRef);
  const { activeSuperRocket, superRocketIndicators, handleSuperRocketClick } =
    useSuperRocket();

  useActiveBoost();
  useSocket((data) => console.log(data));

  // countdown state (ms remaining)
  const [timeLeft, setTimeLeft] = useState(
    isActive && endTime ? Math.max(0, endTime - Date.now()) : 0,
  );

  useEffect(() => {
    if (!isActive || !endTime) return;
    setTimeLeft(Math.max(0, endTime - Date.now()));

    const iv = setInterval(() => {
      const diff = endTime - Date.now();
      setTimeLeft(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(iv);
  }, [isActive, endTime]);

  // format mm:ss
  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className={`
        ${styles.background}
        ${isActive ? styles.boostActive : ''}
      `}
    >
      {/* countdown */}
      {isActive && endTime && (
        <div className={styles.boostTimer}>{formattedTime}</div>
      )}

      {/* tap boost banner */}
      {isActive && type === 'tapboost' && (
        <div className={styles.tapBoostBanner}>Earn ×2</div>
      )}

      {/* amo / infinity */}
      <span className={styles.amo}>
        <span
          className={`
            ${styles.amoBold}
            ${isActive && type === 'fuelboost' ? styles.infinity : ''}
          `}
        >
          {isActive && type === 'fuelboost' ? (
            <span className={styles.infinity}>∞</span>
          ) : (
            amo.current
          )}
        </span>
        <span>/{amo.max}</span>
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
                    +
                    {user!.tapLevel * (isActive && type === 'tapboost' ? 2 : 1)}
                  </motion.div>
                )}
              </motion.div>
            ))}
          {activeSuperRocket && (
            <SuperRocket
              userTapLevel={user!.tapLevel}
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
