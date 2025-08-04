import axios from 'axios';
import {
  api,
  API_BASE,
  getProperUserFromApi,
  User,
  UserGameInfo,
} from '../../../shared';

export async function addUser(initData: string): Promise<{
  user: User;
  token: { accessToken: string; refreshToken: string };
}> {
  const response = await fetch(`${API_BASE}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Failed to add user: ${response.status} ${text}`);
  }
  return response.json();
}

export async function getUser(): Promise<{
  user: User;
  userGameInfo: UserGameInfo;
}> {
  try {
    const response = await api.get('/user', {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;
    return getProperUserFromApi(data);
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
