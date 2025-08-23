import axios from 'axios';
import { api, API_BASE } from '../../../shared';
import { User } from '../types';
import { getUserFromApi } from '../utils';

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

export async function getUser(): Promise<User> {
  try {
    const response = await api.get('/user', {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

export async function updateUserBalance(newBalance: number): Promise<User> {
  try {
    const response = await api.patch(`/user/balance`, {
      balance: newBalance,
    });
    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    let errorMessage = `Failed to update balance`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

export async function saveTradeLink(tradeLink: string) {
  try {
    const response = await api.patch(`/user`, {
      trade_link: tradeLink,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to save the trade link`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
