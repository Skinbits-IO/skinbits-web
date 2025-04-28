import { useEffect, useState } from 'react';
import { API_BASE } from '../../../constants';

//const cookies = new Cookies();

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_BASE}/health`, {
        method: 'GET',
      });
      console.log(res);
      setError(await res.text());
    })();
    /*WebApp.ready();
    const raw = WebApp.initData;
    const params = new URLSearchParams(raw);

    const userParam = params.get('user');
    if (!userParam) {
      setError('No user data in initData');
      return;
    }

    let user: WebAppUser;
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

    login(telegramId, user.first_name, hash)
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
        if (err.message === 'User not found') {
          addUser({
            hash,
            telegramId,
            firstName: user.first_name,
            lastName: user.last_name ?? '',
            username: user.username ?? '',
            languageCode: user.language_code ?? '',
            isPremium: Boolean(user.is_premium),
            photoUrl: user.photo_url ?? '',
          })
            .then((data) => {
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
              setError(data);
            })
            .catch((addErr) => {
              setError(addErr.message);
            });
        } else {
          setError(err.message);
        }
      });*/
  }, []);

  return { loginError: error };
};
