export type UserSubscription = {
  endTime: string;
  isActive: boolean;
  paymentId: string;
  startTime: string;
  subscriptionId: number;
  subscriptionType: 'gold' | 'silver' | 'free';
};
