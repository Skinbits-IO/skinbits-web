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
import { API_BASE } from '../../constants';
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

    const closeButton = WebApp.MainButton;
    const sendOnUnload = () => {
      const s = sessionRef.current;
      if (s.startTime && s.totalTaps > 0) {
        const payload = JSON.stringify({
          end_time: toIsoUtcNoMs(),
          start_time: s.startTime,
          total_taps: s.totalTaps,
          balance_earned: s.balanceEarned,
          boosts_used: s.boostsUsed,
        });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(
            `${API_BASE}/gameSession/add`,
            new Blob([payload], { type: 'application/json' })
          );
        } else {
          fetch(`${API_BASE}/gameSession/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
            keepalive: true,
          });
        }
      }
    };

    const handleCloseButtonClick = () => {
      sendOnUnload();
      WebApp.close();
    };

    closeButton.onClick(handleCloseButtonClick);
    return () => {
      closeButton.offClick(handleCloseButtonClick);
    };
  }, []);
};
