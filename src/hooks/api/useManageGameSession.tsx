import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import {
  resetGameSession,
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
  const sessionRef = useRef(gameSession);

  useEffect(() => {
    sessionRef.current = gameSession;
  }, [gameSession]);

  const mutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: () => {
      dispatch(resetGameSession());
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
    },
  });

  useEffect(() => {
    if (!gameSession.startTime) {
      const start = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
      dispatch(setStartTime(start));
    }

    return () => {
      const session = sessionRef.current;
      if (session.startTime && session.totalTaps > 0) {
        const end = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
        mutation.mutate({ ...session, endTime: end });
      }
    };
  }, []);
};
