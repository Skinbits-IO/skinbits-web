import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export const useSearch = () => useSelector((state: RootState) => state.search);
