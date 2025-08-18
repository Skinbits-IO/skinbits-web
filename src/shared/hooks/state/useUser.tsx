import { useAppSelector } from '../useAppSelector';

export const useUser = () => useAppSelector((state) => state.user);
