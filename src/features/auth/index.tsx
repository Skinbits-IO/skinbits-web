import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { setIsLoading, setTokens, setUser } from '../../state/userSlice';
import { getUser } from '../../api';
import { useLogin, useUser } from '../../hooks';
import { Loader } from '../../components';
import { setUserGameInfo } from '../../state/game/userGameInfoSlice';
import { useQuery } from '@tanstack/react-query';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, user } = useUser();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);

  const { data, isPending, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: 0,
    staleTime: Infinity,
  });

  useLogin(error);

  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      const { accessToken, refreshToken } = cookies;
      dispatch(setTokens({ accessToken, refreshToken }));

      if (!isPending) {
        if (data) {
          const { user, userGameInfo } = data;
          console.log('set user');
          dispatch(setUser(user));
          dispatch(setUserGameInfo(userGameInfo));
        }

        if (error) {
          dispatch(setIsLoading(false));
          dispatch(setTokens({ accessToken: null, refreshToken: null }));
        }
      }
    } else {
      dispatch(setTokens({ accessToken: null, refreshToken: null }));
      dispatch(setUser(null));
      dispatch(setIsLoading(false));
    }
  }, [cookies, data, isPending]);

  if (isLoading || !user) {
    return <Loader />;
  }

  return children;
};
