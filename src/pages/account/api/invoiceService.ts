import axios from 'axios';
import { api } from '../../../shared';

export async function confirmInvoice(id: string, amount: number) {
  try {
    const response = await api.post(`/invoice/confirm`, {
      payment_id: id,
      currency: 'XTR',
      amount,
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
