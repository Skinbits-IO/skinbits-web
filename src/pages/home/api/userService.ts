import axios from 'axios';
import { api } from '../../../shared';

export async function claimRewardForNewRank(newBalance: number) {
  try {
    const response = await api.patch(`/user/balance`, {
      balance: newBalance,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to claim rank reward`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
