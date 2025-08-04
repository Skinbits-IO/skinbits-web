import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import WebApp from '@twa-dev/sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addUser, login } from '../api';
import { useStatusNotification } from '../../../shared';

const cookies = new Cookies();

export const useLogin = (error: Error | null) => {
  const addNotification = useStatusNotification();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (initData: string) => login(initData),
    onSuccess: (data) => {
      if (data.accessToken && data.refreshToken) {
        cookies.set('accessToken', data.accessToken, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });
        cookies.set('refreshToken', data.refreshToken, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });
        queryClient.invalidateQueries({ queryKey: ['user'] });
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
          sameSite: 'lax',
          secure: true,
        });
        cookies.set('refreshToken', data.token.refreshToken, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });
      }
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => addNotification('error', error.message, 2000),
  });

  useEffect(() => {
    WebApp.ready();
    let initData = WebApp.initData;
    if (!initData) {
      initData = import.meta.env.VITE_TEST_USER_INIT_DATA;
    }

    if (error) {
      loginMutation.mutate(initData);
    }
  }, [error]);
};
