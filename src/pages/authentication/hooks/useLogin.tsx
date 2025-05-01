import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import WebApp from '@twa-dev/sdk';
import { addUser, login } from '../../../api';

const cookies = new Cookies();

export const useLogin = (setText: (value: string) => void) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    WebApp.ready();
    const initData = WebApp.initData;
    if (!initData) {
      setError('No user data in initData');
      return;
    }

    setText(initData);

    login(initData)
      .then(({ access_token, refresh_token }) => {
        cookies.set('access_token', access_token, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });
        cookies.set('refresh_token', refresh_token, {
          path: '/',
          sameSite: 'lax',
          secure: true,
        });
        setText(access_token);
      })
      .catch((err) => {
        if (err.message === 'User not found') {
          addUser(initData)
            .then((data) => {
              setText(data);

              if (data.access_token && data.refresh_token) {
                cookies.set('access_token', data.access_token, {
                  path: '/',
                  sameSite: 'lax',
                  secure: true,
                });
                cookies.set('refresh_token', data.refresh_token, {
                  path: '/',
                  sameSite: 'lax',
                  secure: true,
                });
              }
            })
            .catch((addErr) => {
              setError(addErr.message);
            });
        } else {
          setError(err.message);
        }
      });
  }, []);

  return { loginError: error };
};
