import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import {
  resetGameSession,
  setStartTime,
} from '../../../store/slices/game/gameSessionSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GameSession,
  uploadGameSession,
  useGameSession,
  useStatusNotification,
} from '../../../shared';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export const useManageGameSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();
  const { gameSession } = useGameSession();

  const sessionRef = useRef(gameSession);
  useEffect(() => {
    sessionRef.current = gameSession;
    if (gameSession.totalTaps > 0) {
      localStorage.setItem('pendingGameSession', JSON.stringify(gameSession));
    }
  }, [gameSession]);

  const addGameSessionmutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: () => {
      dispatch(resetGameSession());
      localStorage.removeItem('pendingGameSession');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
    },
  });

  useEffect(() => {
    dispatch(setStartTime(toIsoUtcNoMs()));

    return () => {
      if (sessionRef.current.totalTaps > 0) {
        addGameSessionmutation.mutate({
          ...sessionRef.current,
          endTime: toIsoUtcNoMs(),
        } as GameSession);
      }
    };
  }, []);
};
