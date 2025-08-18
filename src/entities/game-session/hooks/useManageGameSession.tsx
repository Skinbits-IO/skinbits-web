import { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  useAppDispatch,
  useGameSession,
  useStatusNotification,
} from '../../../shared';
import { GameSession } from '../types';
import { uploadGameSession } from '../api';
import { resetGameSession, setStartTime } from '../model';
import { setUser } from '../../user';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export const useManageGameSession = () => {
  const dispatch = useAppDispatch();
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
    onSuccess: (data) => {
      dispatch(resetGameSession());
      localStorage.removeItem('pendingGameSession');

      dispatch(setUser(data));
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
