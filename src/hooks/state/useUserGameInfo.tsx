import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const useUserGameInfo = () =>
  useSelector((state: RootState) => state.userGameInfo);
