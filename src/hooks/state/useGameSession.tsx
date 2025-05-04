import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const useGameSession = () =>
  useSelector((state: RootState) => state.gameSession);
