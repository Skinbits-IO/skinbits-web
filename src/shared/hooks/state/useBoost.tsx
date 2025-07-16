import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useBoost = () => useSelector((state: RootState) => state.boost);
