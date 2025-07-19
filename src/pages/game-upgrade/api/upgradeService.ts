import axios from 'axios';
import { api } from '../../../shared';

export async function upgradeUserLevel(
  type: 'tap' | 'fuel' | 'farm',
  price: number
) {
  try {
    const response = await api.patch(`/user/upgrade`, {
      type,
      price,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to upgrade ${type}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

export async function buyFarm() {
  try {
    const response = await api.post(`/farming/buy`);
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to buy farming`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
