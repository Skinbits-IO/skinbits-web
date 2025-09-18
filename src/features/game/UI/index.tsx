import { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRocket, useSuperRocket } from '../hooks';
import { useAppSelector, useUser } from '../../../shared';
import { useGameContext } from '../context';
import { UpgradeButton } from './upgrade-button';
import { SuperRocket } from './super-rocket';
import { GameRocketIcon } from './game-rocket-icon';

export const GameWidget = () => {
  const gameRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { amo } = useGameContext();
  const { isActive, type, endTime } = useAppSelector((state) => state.boost);

  const { rocketPositions, flyingIndicators, handleRocketClick } =
    useRocket(gameRef);
  const { activeSuperRocket, superRocketIndicators, handleSuperRocketClick } =
    useSuperRocket();

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

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div
      className={`
        relative h-full w-full overflow-hidden rounded-[1.25rem] border border-white/10
        bg-[url('/game-background.png')] bg-cover bg-center bg-no-repeat
        ${isActive ? 'after:absolute after:inset-0 after:rounded-[1.25rem] after:border-4 after:border-yellow-400 after:pointer-events-none after:animate-[pulse-gold-border_1.8s_ease-in-out_infinite]' : ''}
      `}
    >
      {isActive && endTime && (
        <div className="absolute top-5 left-5 z-10 rounded-md bg-black/60 px-2 py-1 text-sm font-bold text-yellow-400">
          {formattedTime}
        </div>
      )}

      {isActive && type === 'tapboost' && (
        <div className="absolute top-5 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-200 px-3 py-1 text-sm font-bold text-black">
          Earn ×2
        </div>
      )}

      <span className="absolute right-4 top-4 flex items-center text-xs font-normal text-[#AFAFAF]">
        <span
          className={`text-sm font-semibold ${isActive && type === 'fuelboost' ? 'animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-400 bg-clip-text text-transparent' : ''}`}
        >
          {isActive && type === 'fuelboost' ? (
            <span className="text-[20px]">&infin;</span>
          ) : (
            amo.current
          )}
        </span>
        <span>/{amo.max}</span>
      </span>

      <div
        className="relative top-[30px] mx-[10px] h-[calc(100%-6.5625rem)] w-full bg-transparent"
        ref={gameRef}
      >
        <AnimatePresence>
          {!activeSuperRocket &&
            rocketPositions.map((pos, index) => (
              <motion.div key={index}>
                <motion.div
                  className="absolute flex h-[50px] w-[50px] items-center justify-center"
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
                    className="pointer-events-none absolute text-[18px] font-bold text-white"
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
