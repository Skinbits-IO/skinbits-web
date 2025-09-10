import axios from 'axios';
import { api } from '../../../shared';

export async function getWsToken(): Promise<string> {
  try {
    const response = await api.post<{ wsToken: string }>('/auth/ws-token', {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data;
    return data.wsToken;
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
