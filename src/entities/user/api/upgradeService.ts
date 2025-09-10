import axios from 'axios';
import { api } from '../../../shared';
import { User } from '../types';
import { getUserFromApi } from '../utils';

export async function upgradeUserLevel(
  type: 'tap' | 'fuel' | 'farm',
): Promise<User> {
  try {
    const response = await api.patch(`/user/upgrade`, {
      type,
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
