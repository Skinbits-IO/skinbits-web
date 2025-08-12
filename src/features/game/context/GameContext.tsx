import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

type GameContextType = {
  superRocketBuffer: number;
  setSuperRocketBuffer: Dispatch<SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [buffer, setBuffer] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        superRocketBuffer: buffer,
        setSuperRocketBuffer: setBuffer,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
