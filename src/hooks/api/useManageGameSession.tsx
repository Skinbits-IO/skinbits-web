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
import { closingBehavior } from '@telegram-apps/sdk';

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

  const lastTapRef = useRef<number>(Date.now());
  useEffect(() => {
    if (gameSession.totalTaps > 0) {
      lastTapRef.current = Date.now();
    }
  }, [gameSession.totalTaps]);

  const mutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: () => {
      dispatch(resetGameSession());
      closingBehavior.disableConfirmation();
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
      closingBehavior.enableConfirmation();
    },
  });

  useEffect(() => {
    WebApp.ready();
    closingBehavior.mount();

    if (!gameSession.startTime) {
      dispatch(setStartTime(toIsoUtcNoMs()));
    }

    closingBehavior.enableConfirmation();
  }, [dispatch, closingBehavior]);

  useEffect(() => {
    const interval = setInterval(() => {
      const session = sessionRef.current;
      if (
        session.startTime &&
        session.totalTaps > 0 &&
        !mutation.isPending &&
        !mutation.isSuccess
      ) {
        closingBehavior.enableConfirmation();
        mutation.mutate({ ...session, endTime: toIsoUtcNoMs() });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [lastTapRef.current, mutation, closingBehavior]);

  useEffect(() => {
    return () => {
      const session = sessionRef.current;
      if (session.startTime && session.totalTaps > 0 && !mutation.isSuccess) {
        mutation.mutate({ ...session, endTime: toIsoUtcNoMs() });
      }

      if (closingBehavior.isMounted()) {
        closingBehavior.unmount();
      }
    };
  }, [mutation, closingBehavior]);
};
