import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { FC, PropsWithChildren, useEffect } from 'react';
import {
  setIsLoading,
  setUser,
  setUserSubscription,
} from '../../store/slices/userSlice';
import { Loader } from '../../components';
import { setUserGameInfo } from '../../store/slices/game/userGameInfoSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  resetGameSession,
  setStartTime,
} from '../../store/slices/game/gameSessionSlice';
import { useLogin } from './hooks';
import { getUser, getUserSubscription } from './api';
import {
  GameSession,
  uploadGameSession,
  useStatusNotification,
  useUser,
} from '../../shared';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useUser();

  const addNotification = useStatusNotification();

  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: 0,
    staleTime: Infinity,
  });

  const { data: subscription, isPending: isSubscriptionPending } = useQuery({
    queryKey: ['user-subscription'],
    queryFn: () => getUserSubscription(),
    retry: 0,
    staleTime: Infinity,
  });

  const addGameSessionMutation = useMutation({
    mutationFn: (session: GameSession) => uploadGameSession(session),
    onSuccess: (data) => {
      dispatch(resetGameSession());
      dispatch(setStartTime(toIsoUtcNoMs()));
      localStorage.removeItem('pendingGameSession');

      dispatch(setUser(data.user));
      dispatch(setUserGameInfo(data.userGameInfo));

      dispatch(setIsLoading(false));
    },
    onError: (err: any) => {
      addNotification('error', err.message || 'Failed to upload session', 3000);
    },
  });

  useLogin(error);

  useEffect(() => {
    if (!isPending && !isSubscriptionPending) {
      if (data) {
        const { user, userGameInfo } = data;
        dispatch(setUser(user));
        dispatch(setUserGameInfo(userGameInfo));
        dispatch(setUserSubscription(subscription ?? null));

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
  }, [data, isPending, subscription, isSubscriptionPending]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};
