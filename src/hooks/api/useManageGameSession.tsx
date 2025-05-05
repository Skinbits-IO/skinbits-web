import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import {
  resetGameSession,
  setStartTime,
} from '../../state/game/gameSessionSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameSession } from '../../types';
import { uploadGameSession } from '../../api';
import { useGameSession } from '../state/useGameSession';
import { useStatusNotification } from '../useStatusNotification';

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

  const mutation = useMutation({
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
    const raw = localStorage.getItem('pendingGameSession');
    if (raw) {
      try {
        const pending = JSON.parse(raw);
        mutation.mutate({ ...pending, endTime: toIsoUtcNoMs() });
      } catch {}
    }
  }, []);

  useEffect(() => {
    dispatch(setStartTime(toIsoUtcNoMs()));

    return () => {
      if (sessionRef.current.totalTaps > 0) {
        mutation.mutate({ ...sessionRef.current, endTime: toIsoUtcNoMs() });
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameSession.totalTaps && gameSession.startTime) {
        mutation.mutate({ ...gameSession, endTime: toIsoUtcNoMs() });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [gameSession.totalTaps]);
};
