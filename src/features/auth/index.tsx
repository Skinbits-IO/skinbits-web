import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { setIsLoading, setUser } from '../../state/userSlice';
import { getUser, uploadGameSession } from '../../api';
import { useLogin, useUser } from '../../hooks';
import { Loader } from '../../components';
import { setUserGameInfo } from '../../state/game/userGameInfoSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  resetGameSession,
  setStartTime,
} from '../../state/game/gameSessionSlice';
import { GameSession } from '../../types';
import { useStatusNotification } from '../../hooks/useStatusNotification';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useUser();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);

  const queryClient = useQueryClient();
  const addNotification = useStatusNotification();

  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: 0,
    staleTime: Infinity,
  });

  const addGameSessionMutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: () => {
      dispatch(resetGameSession());
      dispatch(setStartTime(toIsoUtcNoMs()));

      localStorage.removeItem('pendingGameSession');
      queryClient
        .invalidateQueries({ queryKey: ['user'] })
        .finally(() => dispatch(setIsLoading(false)));
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
    },
  });

  useLogin(error);

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      if (!isPending) {
        if (data) {
          const { user, userGameInfo } = data;
          dispatch(setUser(user));
          dispatch(setUserGameInfo(userGameInfo));
          if (localStorage.getItem('pendingGameSession')) {
            const raw = localStorage.getItem('pendingGameSession');
            if (raw) {
              try {
                const pending = JSON.parse(raw);
                addGameSessionMutation.mutate({
                  ...pending,
                  endTime: toIsoUtcNoMs(),
                });
              } catch {
                localStorage.removeItem('pendingGameSession');
                dispatch(setIsLoading(false));
              }
            }
          } else {
            dispatch(setIsLoading(false));
          }
        }
      }
    } else {
      dispatch(setUser(null));
      dispatch(setIsLoading(false));
    }
  }, [cookies, data, isPending]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};
