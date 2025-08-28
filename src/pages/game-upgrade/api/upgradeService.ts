import axios from 'axios';
import { api } from '../../../shared';
import { getUserFromApi, User } from '../../../entities';

export async function upgradeUserLevel(
  type: 'tap' | 'fuel' | 'farm',
  price: number
): Promise<User> {
  try {
    const response = await api.patch(`/user/upgrade`, {
      type,
      price,
    });
    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    let errorMessage = `Failed to upgrade ${type}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

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
