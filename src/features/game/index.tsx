import { useRef } from 'react';
import styles from './GameWidget.module.css';
import { UpgradeButton } from './UI/UpgradeButton';
import { GameRocketIcon } from '../../components';
import { AnimatePresence, motion } from 'framer-motion';
import { SuperRocket } from './UI/SuperRocket';
import {
  useAmo,
  useManageGameSession,
  useRocket,
  useSuperRocket,
  useUserGameInfo,
} from '../../hooks';

export const GameWidget = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);

  const { user } = useUserGameInfo();
  const { amo, maxAmo } = useAmo();

  const { rocketPositions, flyingIndicators, handleRocketClick } =
    useRocket(gameRef);
  const { activeSuperRocket, superRocketIndicators, handleSuperRocketClick } =
    useSuperRocket();

  useManageGameSession();

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
                    +{user!.tapLevel}
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
