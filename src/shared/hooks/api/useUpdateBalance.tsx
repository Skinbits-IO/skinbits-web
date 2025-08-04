import { useStatusNotification } from '../useStatusNotification';
import { useMutation } from '@tanstack/react-query';
import { updateUserBalance } from '../../api';
import { setUser } from '../../../store/slices/userSlice';
import { setUserGameInfo } from '../../../store/slices/game/userGameInfoSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

export const useUpdateBalance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addNotification = useStatusNotification();

  const mutation = useMutation({
    mutationFn: (data: { newBalance: number }) =>
      updateUserBalance(data.newBalance),
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      dispatch(setUserGameInfo(data.userGameInfo));
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to update balance', 3000);
    },
  });

  return { mutation };
};
