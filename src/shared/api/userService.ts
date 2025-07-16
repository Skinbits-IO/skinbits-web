import axios from 'axios';
import { api } from './api';

export async function updateUserBalance(newBalance: number) {
  try {
    const response = await api.patch(`/user/balance`, {
      balance: newBalance,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to update balance`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
