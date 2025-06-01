import axios from 'axios';
import { api } from '../../../shared';

export async function upgradeUserLevel(
  type: 'tap' | 'fuel' | 'farm',
  price: number
) {
  try {
    const response = await api.patch(`/user`, {
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
