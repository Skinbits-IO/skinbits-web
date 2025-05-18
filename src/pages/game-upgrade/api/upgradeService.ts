import axios from 'axios';
import { api } from '../../../shared';

export async function upgradeUserLevel(level: string, price: number) {
  try {
    const response = await api.patch(`/user/${level}/${price}`);
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to upgrade ${level}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
