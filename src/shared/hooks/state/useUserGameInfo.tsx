import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useUserGameInfo = () =>
  useSelector((state: RootState) => state.userGameInfo);
