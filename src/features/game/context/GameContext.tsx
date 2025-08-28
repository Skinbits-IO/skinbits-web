import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';

type GameContextType = {
  amo: {
    current: number;
    max: number;
  };
  setAmo: Dispatch<SetStateAction<number>>;
  setMaxAmo: Dispatch<SetStateAction<number>>;
  superRocketBuffer: number;
  setSuperRocketBuffer: Dispatch<SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [amo, setAmo] = useState<number>(0);
  const [maxAmo, setMaxAmo] = useState<number>(0);

  const [buffer, setBuffer] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        amo: { current: amo, max: maxAmo },
        setAmo,
        setMaxAmo,
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
