import { useAppSelector } from '../useAppSelector';

export const useGameSession = () =>
  useAppSelector((state) => state.gameSession);
