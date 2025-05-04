import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import WebApp from '@twa-dev/sdk';
import { addUser, login } from '../../api';
import { useMutation } from '@tanstack/react-query';

const cookies = new Cookies();

export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (initData: string) => login(initData),
    onSuccess: (data) => {
      console.log(data);
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
      }
    },
    onError: (error, initData: string) => {
      if (error.message === 'User not found') {
        createUserMutatation.mutate(initData);
      } else {
        console.error(error);
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

      console.log(data);
    },
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    WebApp.ready();
    let initData = WebApp.initData;
    if (!initData) {
      console.error('No user data in initData');
      initData = import.meta.env.VITE_TEST_USER_INIT_DATA;
    }
    loginMutation.mutate(initData);
  }, []);
};
