import axios from 'axios';
import { api } from '../../../shared';

export async function confirmTonInvoice(id: string) {
  try {
    const response = await api.post(`/invoice/confirm-ton`, {
      payment_id: id,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to confirm subscriptions`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
