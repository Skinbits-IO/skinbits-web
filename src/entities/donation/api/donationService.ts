import axios from 'axios';
import { api } from '../../../shared';

export interface DonationResponse {
  donation: {
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    payment_id: string;
    notes: string;
    donation_id: number;
    donation_date: string;
  };
  invoiceLink: string;
}

export async function createDonation(body: {
  amount: number;
  currency: string;
  paymentMethod: string;
  notes: string;
}) {
  try {
    const response = await api.post<{ data: DonationResponse }>(`/donations`, {
      amount: body.amount,
      currency: body.currency,
      payment_method: body.paymentMethod,
      notes: body.notes,
    });
    return response.data.data;
  } catch (error) {
    let errorMessage = `Failed to create donation`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
