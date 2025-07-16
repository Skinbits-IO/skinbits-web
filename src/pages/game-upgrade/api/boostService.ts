import axios from 'axios';
import { api, getProperUserFromApi, User, UserGameInfo } from '../../../shared';

export async function updateBoost(
  type: 'tapboost' | 'fuelboost',
  quantity: number
): Promise<{ user: User; userGameInfo: UserGameInfo }> {
  try {
    const response = await api.patch(`/user/update-boost`, {
      type,
      quantity,
    });

    const data = response.data.user;
    return getProperUserFromApi(data);
  } catch (error) {
    console.log(error);
    let errorMessage = `Failed to update ${type}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
