import { useEffect, useRef } from 'react';
import { toIsoUtcNoMs, useAppDispatch, useGameSession } from '../../../shared';
import { GameSession } from '../types';
import { setStartTime } from '../model';
import { useAddGameSession } from './useAddGameSession';

export const useManageGameSession = () => {
  const dispatch = useAppDispatch();
  const { gameSession } = useGameSession();
  const { mutate } = useAddGameSession();

  const sessionRef = useRef(gameSession);
  useEffect(() => {
    sessionRef.current = gameSession;
    if (gameSession.totalTaps > 0) {
      localStorage.setItem('pendingGameSession', JSON.stringify(gameSession));
    }
  }, [gameSession]);

  useEffect(() => {
    dispatch(setStartTime(toIsoUtcNoMs()));

    return () => {
      if (sessionRef.current.totalTaps > 0) {
        mutate({
          ...sessionRef.current,
          endTime: toIsoUtcNoMs(),
        } as GameSession);
      }
    };
  }, []);
};
