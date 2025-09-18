import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import WebApp from '@twa-dev/sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api';
import { addUser, setWsToken } from '../../../entities';
import { useAppDispatch, useStatusNotification } from '../../../shared';

const cookies = new Cookies();

export const useLogin = (error: Error | null) => {
  const addNotification = useStatusNotification();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: (initData: string) => login(initData),
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken && data.wsToken) {
        cookies.set('accessToken', data.accessToken, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });

        cookies.set('refreshToken', data.refreshToken, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });

        dispatch(setWsToken(data.wsToken));
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
      }
    },
    onError: (error, initData: string) => {
      if (error.message === 'User not found') {
        createUserMutatation.mutate(initData);
      } else {
        addNotification('error', error.message, 2000);
      }
    },
  });

  const createUserMutatation = useMutation({
    mutationFn: (initData: string) => addUser(initData),
    onSuccess: (data) => {
      if (data.token) {
        cookies.set('accessToken', data.token.accessToken, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });

        cookies.set('refreshToken', data.token.refreshToken, {
          path: '/',
          sameSite: 'strict',
          secure: true,
        });

        dispatch(setWsToken(data.token.wsToken));
        queryClient.invalidateQueries({ queryKey: ['user'] });
        queryClient.invalidateQueries({ queryKey: ['user-subscription'] });
      }
    },
    onError: (error) => addNotification('error', error.message, 2000),
  });

  useEffect(() => {
    let initData = WebApp.initData;
    if (!initData) {
      initData = import.meta.env.VITE_TEST_USER_INIT_DATA;
    }

    if (error) {
      loginMutation.mutate(initData);
    }
  }, [error]);
};
