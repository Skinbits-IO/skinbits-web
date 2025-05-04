import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../state/store';
import { FC, PropsWithChildren, ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { setIsLoading, setTokens, setUser } from '../../state/userSlice';
import { getUser } from '../../api';
import { useLogin, useUser } from '../../hooks';
import { Loader } from '../../components';
import { setUserGameInfo } from '../../state/game/userGameInfoSlice';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);

  useLogin();
  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      const { accessToken, refreshToken } = cookies;
      dispatch(setTokens({ accessToken, refreshToken }));

      (async () => {
        try {
          const { user, userGameInfo } = await getUser();
          dispatch(setUser(user));
          dispatch(setUserGameInfo(userGameInfo));
        } catch {
          dispatch(setIsLoading(false));
          dispatch(setTokens({ accessToken: null, refreshToken: null }));
        }
      })();
    } else {
      dispatch(setTokens({ accessToken: null, refreshToken: null }));
      dispatch(setUser(null));
      dispatch(setIsLoading(false));
    }
  }, [cookies]);

  return children;
};

interface IAuthGuardProps {
  children: ReactNode;
}

export const AuthGuard = ({ children }: IAuthGuardProps) => {
  const { isLoading, user } = useUser();

  if (isLoading || !user) {
    return <Loader />;
  }

  return children;
};
