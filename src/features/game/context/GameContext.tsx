import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { ClientEvents, ServerEvents, useSocket } from '../../socket';
import { Socket } from 'socket.io-client';

type GameContextType = {
  amo: {
    current: number;
    max: number;
  };
  setAmo: Dispatch<SetStateAction<number>>;
  setMaxAmo: Dispatch<SetStateAction<number>>;
  socketRef: React.MutableRefObject<Socket<ServerEvents, ClientEvents> | null>;
  isRocketPending: boolean;
  setIsRocketPending: Dispatch<SetStateAction<boolean>>;
  hasTokenError: boolean;
  setHasTokenError: Dispatch<SetStateAction<boolean>>;
  superRocketBuffer: number;
  setSuperRocketBuffer: Dispatch<SetStateAction<number>>;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [amo, setAmo] = useState<number>(0);
  const [maxAmo, setMaxAmo] = useState<number>(0);

  const { socketRef } = useSocket(
    () => setIsPending(false),
    () => setHasTokenError(true),
  );
  const [isPending, setIsPending] = useState<boolean>(false);
  const [hasTokenError, setHasTokenError] = useState<boolean>(false);

  const [buffer, setBuffer] = useState<number>(0);

  return (
    <GameContext.Provider
      value={{
        amo: { current: amo, max: maxAmo },
        setAmo,
        setMaxAmo,
        socketRef,
        isRocketPending: isPending,
        setIsRocketPending: setIsPending,
        hasTokenError,
        setHasTokenError,
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
