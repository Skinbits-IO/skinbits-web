import { useMutation } from '@tanstack/react-query';
import { buyFarm } from '../api';
import { useAppDispatch, useStatusNotification } from '../../../shared';
import { setUser } from '../../user';

export const useBuyFarm = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: () => buyFarm(),
    onSuccess: (data) => {
      dispatch(setUser(data));
      onSuccess?.();
    },
    onError: (err) => {
      addNotification('error', err.message || 'Failed to buy farm', 3000);
    },
  });
};
