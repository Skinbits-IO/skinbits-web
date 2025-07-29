import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { deactivateSubscription } from '../api';

export const useDeactivateSubscription = () => {
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { id: number }) => deactivateSubscription(data.id),
    onSuccess: (data) => {
      console.log('Subscription deactivated:', data);
    },
    onError: (err) => {
      console.error('Subscription deactivate error:', err);
      addNotification(
        'error',
        err.message || 'Failed to deactivate subscription',
        3000
      );
    },
  });
};
