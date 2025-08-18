import { FC, PropsWithChildren, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useLogin } from './hooks';
import {
  Loader,
  useAppDispatch,
  useStatusNotification,
  useUser,
} from '../../shared';
import {
  GameSession,
  getUser,
  getUserSubscription,
  resetGameSession,
  setIsLoading,
  setStartTime,
  setUser,
  setUserSubscription,
  uploadGameSession,
} from '../../entities';

const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
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

      dispatch(setUser(data));
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
        dispatch(setUser(data));
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
