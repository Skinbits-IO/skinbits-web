import axios from 'axios';
import { api } from '../../../shared';
import { getUserFromApi, User } from '../../../entities';

export async function updateBoost(
  type: 'tapboost' | 'fuelboost',
  quantity: number
): Promise<User> {
  try {
    const response = await api.patch(`/user/update-boost`, {
      type,
      quantity,
    });

    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    console.log(error);
    let errorMessage = `Failed to update ${type}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
