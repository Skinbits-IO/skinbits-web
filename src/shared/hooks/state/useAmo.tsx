import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useAmo = () => useSelector((state: RootState) => state.amo);
