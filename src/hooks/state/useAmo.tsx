import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

export const useAmo = () => useSelector((state: RootState) => state.amo);
