import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useStatusNotification } from '../../../shared';
import { GameSession } from '../types';
import { uploadGameSession } from '../api';
import { resetGameSession } from '../model';
import { setUser } from '../../user';

export const useAddGameSession = (onSuccess?: () => void) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: (data) => {
      dispatch(resetGameSession());
      localStorage.removeItem('pendingGameSession');
      dispatch(setUser(data));
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
    },
  });
};
