import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useFarmState = () => useSelector((state: RootState) => state.farm);
