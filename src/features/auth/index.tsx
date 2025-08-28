import { FC, PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLogin } from './hooks';
import { Loader, toIsoUtcNoMs, useAppDispatch, useUser } from '../../shared';
import {
  getUser,
  getUserSubscription,
  setIsLoading,
  setStartTime,
  setUser,
  setUserSubscription,
  useAddGameSession,
} from '../../entities';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useUser();

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

  const { mutate } = useAddGameSession(() => {
    dispatch(setStartTime(toIsoUtcNoMs()));
    dispatch(setIsLoading(false));
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
              mutate({
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
