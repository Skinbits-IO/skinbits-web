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
    const sendLastBeacon = () => {
      const s = sessionRef.current;
      if (s.startTime && s.totalTaps > 0) {
        const payload = JSON.stringify({
          start_time: s.startTime,
          end_time: toIsoUtcNoMs(),
          total_taps: s.totalTaps,
          balance_earned: s.balanceEarned,
          boosts_used: s.boostsUsed,
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            `${process.env.REACT_APP_API_URL}/gameSession/add`,
            new Blob([payload], { type: 'application/json' })
          );
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/gameSession/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          });
        }
      }
    };

    window.addEventListener('pagehide', sendLastBeacon);
    window.addEventListener('beforeunload', sendLastBeacon);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendLastBeacon();
      }
    });

    return () => {
      window.removeEventListener('pagehide', sendLastBeacon);
      window.removeEventListener('beforeunload', sendLastBeacon);
      document.removeEventListener('visibilitychange', sendLastBeacon);
    };
  }, []);
};
