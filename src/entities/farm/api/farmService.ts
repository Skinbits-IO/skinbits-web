import axios from 'axios';
import { api } from '../../../shared';
import { getUserFromApi, User } from '../../user';

export async function buyFarm(): Promise<User> {
  try {
    const response = await api.post(`/farming/buy`);
    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    let errorMessage = `Failed to buy farming`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
