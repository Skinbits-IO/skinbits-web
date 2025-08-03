import axios from 'axios';
import { api, UserSubscription } from '../../../shared';

export async function getUserSubscription(): Promise<UserSubscription> {
  try {
    const response = await api.get('/subscriptions/user');
    const data = response.data.data;

    const camelCased: UserSubscription = {
      endTime: data.end_time,
      isActive: data.is_active,
      paymentId: data.payment_id,
      startTime: data.start_time,
      subscriptionId: data.subscription_id,
      subscriptionType: data.subscription_type,
    };

    return camelCased;
  } catch (error) {
    let errorMessage = `Failed to get user subscription`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
