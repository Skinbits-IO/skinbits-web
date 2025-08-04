import axios from 'axios';
import { api } from '../../../shared';

/**
 * Exactly what the server returns in `data.subscription`
 */
interface SubscriptionDTO {
  subscription_type: 'free' | 'gold' | 'premium';
  start_time: string;
  end_time: string;
  is_active: boolean;
  payment_id: string;
  subscription_id: number;
}

/**
 * The shape of the entire server response
 */
export interface SubscriptionResponse {
  success: true;
  message: string;
  data: {
    subscription: SubscriptionDTO;
    invoiceLink: string;
  };
}

/**
 * A nice, app-friendly version with camelCase & Dates
 */
export interface Subscription {
  subscriptionType: 'free' | 'gold' | 'premium';
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  paymentId: string;
  subscriptionId: number;
}

export async function createSubscription(body: {
  subscriptionType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  notes: string;
}) {
  try {
    const response = await api.post<SubscriptionResponse>('/subscriptions', {
      subscription_type: body.subscriptionType,
      amount: body.amount,
      currency: body.currency,
      payment_method: body.paymentMethod,
      notes: body.notes,
    });

    const dto = response.data.data.subscription;
    return {
      invoiceLink: response.data.data.invoiceLink,
      subscription: {
        subscriptionType: dto.subscription_type,
        startTime: new Date(dto.start_time),
        endTime: new Date(dto.end_time),
        isActive: dto.is_active,
        paymentId: dto.payment_id,
        subscriptionId: dto.subscription_id,
      },
    };
  } catch (error) {
    let errorMessage = `Failed to create subscription`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
