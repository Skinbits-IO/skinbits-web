import { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router';
import { login } from '../../../api';

const cookies = new Cookies();

export const useLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    WebApp.ready();
    const raw = WebApp.initData;
    const params = new URLSearchParams(raw);

    const userParam = params.get('user');
    if (!userParam) {
      setError('No user data in initData');
      return;
    }

    let user: { id: number };
    try {
      user = JSON.parse(decodeURIComponent(userParam));
    } catch (e) {
      setError('Failed to parse user from initData' + e);
      return;
    }

    const telegramId = user.id;
    const hash = params.get('hash');
    if (!hash) {
      setError('No hash in initData');
      return;
    }

    login(telegramId, hash)
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
        navigate('/home');
      })
      .catch((err) => {
        setError('Login failed: ' + err.message);
      });
  }, []);

  return { loginError: error };
};
