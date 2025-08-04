import axios from 'axios';
import { api } from './api';
import { User, UserGameInfo } from '../types';
import { getProperUserFromApi } from '../utils';

export async function updateUserBalance(
  newBalance: number
): Promise<{ user: User; userGameInfo: UserGameInfo }> {
  try {
    const response = await api.patch(`/user/balance`, {
      balance: newBalance,
    });
    const data = response.data;
    return getProperUserFromApi(data);
  } catch (error) {
    let errorMessage = `Failed to update balance`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
