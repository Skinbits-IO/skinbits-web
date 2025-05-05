import { useEffect, useRef } from 'react';
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
import WebApp from '@twa-dev/sdk';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

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
      dispatch(setStartTime(toIsoUtcNoMs()));
    }

    return () => {
      const session = sessionRef.current;
      if (session.startTime && session.totalTaps > 0) {
        mutation.mutate({ ...session, endTime: toIsoUtcNoMs() });
      }
    };
  }, []);

  useEffect(() => {
    WebApp.ready();
    const onClose = () => {
      const s = sessionRef.current;
      if (s.startTime && s.totalTaps > 0) {
        mutation.mutate({ ...s, endTime: toIsoUtcNoMs() });
      }
    };
    WebApp.onEvent('deactivated', onClose);
    return () => {
      WebApp.offEvent('deactivated', onClose);
    };
  }, [mutation]);
};
