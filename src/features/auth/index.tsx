import { FC, PropsWithChildren, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLogin } from './hooks';
import { Loader, useAppDispatch, useUser } from '../../shared';
import {
  getUser,
  getUserSubscription,
  setIsLoading,
  setUser,
  setUserSubscription,
  setWsToken,
} from '../../entities';
import { getWsToken } from './api';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { tokens, isLoading } = useUser();

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
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
    enabled: !!user,
  });

  const { data: wsToken, isPending: isWsTokenPending } = useQuery({
    queryKey: ['ws-token'],
    queryFn: () => getWsToken(),
    retry: 0,
    staleTime: Infinity,
    enabled: !!user && !tokens,
  });

  useLogin(error);

  useEffect(() => {
    if (!isPending && !isSubscriptionPending && (tokens || !isWsTokenPending)) {
      if (user) {
        dispatch(setUser(user));
        dispatch(setUserSubscription(subscription ?? null));
        if (wsToken) dispatch(setWsToken(wsToken));

        dispatch(setIsLoading(false));
      }
    }
  }, [
    user,
    isPending,
    subscription,
    isSubscriptionPending,
    wsToken,
    isWsTokenPending,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};
