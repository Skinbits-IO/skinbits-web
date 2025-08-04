import { useRef, useState, useEffect } from 'react';
import styles from './GameWidget.module.css';
import { GameRocketIcon } from '../../components';
import { AnimatePresence, motion } from 'framer-motion';
import {
  useActiveBoost,
  useManageGameSession,
  useRocket,
  useSuperRocket,
} from './hooks';
import { SuperRocket, UpgradeButton } from './UI';
import { useAmo, useBoost, useUserGameInfo } from '../../shared';

export const GameWidget = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUserGameInfo();
  const { amo, maxAmo } = useAmo();
  const { isActive, type, endTime } = useBoost();
  const { rocketPositions, flyingIndicators, handleRocketClick } =
    useRocket(gameRef);
  const { activeSuperRocket, superRocketIndicators, handleSuperRocketClick } =
    useSuperRocket();

  useManageGameSession();
  useActiveBoost();

  // countdown state (ms remaining)
  const [timeLeft, setTimeLeft] = useState(
    isActive && endTime ? Math.max(0, endTime - Date.now()) : 0
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
        <div className={styles.tapBoostBanner}>Earn ×10</div>
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
            amo
          )}
        </span>
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
                    +
                    {isActive && type === 'tapboost'
                      ? user!.tapLevel * 10
                      : user!.tapLevel}
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
