import axios from 'axios';
import { api } from '../../../shared';

export async function generateReferralLink(): Promise<string> {
  try {
    const response = await api.get<{ link: string }>(`/referral/generate`);
    return response.data.link;
  } catch (error) {
    let errorMessage = `Failed to generate referral link`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
