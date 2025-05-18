import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useGameSession = () =>
  useSelector((state: RootState) => state.gameSession);
