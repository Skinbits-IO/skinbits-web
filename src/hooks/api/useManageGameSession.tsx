import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import {
  resetGameSession,
  setEndTime,
  setStartTime,
} from '../../state/game/gameSessionSlice';
import { useMutation } from '@tanstack/react-query';
import { GameSession } from '../../types';
import { uploadGameSession } from '../../api';
import { useGameSession } from '../state/useGameSession';
import { useStatusNotification } from '../useStatusNotification';

export const useManageGameSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const addNotification = useStatusNotification();

  const { gameSession } = useGameSession();

  const uploadGameSessionMutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: () => dispatch(resetGameSession()),
    onError: (error) => addNotification('error', error.message, 2000),
  });

  useEffect(() => {
    const startTime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    dispatch(setStartTime(startTime));

    return () => {
      const endTime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
      dispatch(setEndTime(endTime));

      if (gameSession.totalTaps !== 0) {
        uploadGameSessionMutation.mutate(gameSession);
      }
    };
  }, []);
};
