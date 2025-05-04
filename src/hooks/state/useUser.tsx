import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const useUser = () => useSelector((state: RootState) => state.user);
