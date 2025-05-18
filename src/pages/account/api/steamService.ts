import axios from 'axios';
import { api } from '../../../shared';

export async function saveTradeLink(tradeLink: string) {
  try {
    const response = await api.patch(`/user`, {
      trade_link: tradeLink,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to svae the trade link`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
