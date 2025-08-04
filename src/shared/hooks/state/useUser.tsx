import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useUser = () => useSelector((state: RootState) => state.user);
