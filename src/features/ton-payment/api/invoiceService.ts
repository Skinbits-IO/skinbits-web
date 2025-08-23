import axios from 'axios';
import { api } from '../../../shared';

export async function confirmTonInvoice(id: string, amount: number) {
  try {
    const response = await api.post(`/invoice/confirm-ton`, {
      payment_id: id,
      currency: 'TON',
      amount: amount,
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
