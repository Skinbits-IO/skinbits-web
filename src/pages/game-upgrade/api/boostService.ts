import axios from 'axios';
import { api } from '../../../shared';

export async function updateBoost(
  type: 'tapboost' | 'fuelboost',
  quantity: number
) {
  try {
    const response = await api.patch(`/user/update-boost`, {
      type,
      quantity,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to update ${type}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
