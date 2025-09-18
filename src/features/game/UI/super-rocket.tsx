import { motion } from 'framer-motion';
import { useAppSelector } from '../../../shared';
import { GameRocketIcon } from './game-rocket-icon';

interface ISuperRocket {
  userTapLevel: number;
  superRocketIndicators: { id: number; x: number; y: number }[];
  handleSuperRocketClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const SuperRocket = ({
  userTapLevel,
  superRocketIndicators,
  handleSuperRocketClick,
}: ISuperRocket) => {
  const { isActive, type } = useAppSelector((state) => state.boost);

  return (
    <motion.div
      className="
        absolute
        inset-0
        m-auto
        flex
        items-center
        justify-center
        w-fit
        h-fit
        touch-none
      "
      initial={{ scale: 0.9, y: -10 }}
      animate={{
        scale: 1,
        y: 10,
        rotate: [-2, 2, -2],
      }}
      whileTap={{ scale: 1.15, y: -10 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        rotate: {
          repeat: Infinity,
          repeatType: 'mirror',
          duration: 1.5,
        },
      }}
      onPointerDown={handleSuperRocketClick}
    >
      <GameRocketIcon
        size={250}
        primaryColor="#FFE092"
        secondaryColor="#FCCB4D"
      />
      {superRocketIndicators.map((indicator) => {
        return (
          <motion.div key={indicator.id}>
            <motion.div
              key={`indicator-${indicator.id}`}
              className="absolute text-white text-[20px] font-bold pointer-events-none"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                left: indicator.x + 10,
                top: indicator.y + 10,
              }}
            >
              +{userTapLevel * (isActive && type === 'tapboost' ? 2 : 1)}
            </motion.div>
            <motion.div
              key={`burst-${indicator.id}`}
              className="absolute w-5 h-5 rounded-full bg-white/80 pointer-events-none"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                left: indicator.x - 10,
                top: indicator.y - 10,
              }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};
