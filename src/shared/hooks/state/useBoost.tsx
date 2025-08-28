import { useAppSelector } from '../useAppSelector';

export const useBoost = () => useAppSelector((state) => state.boost);
