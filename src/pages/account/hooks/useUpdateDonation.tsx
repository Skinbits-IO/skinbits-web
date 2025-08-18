import { useMutation } from '@tanstack/react-query';
import { updateDonationStatus } from '../api';
import { useStatusNotification } from '../../../shared';

export const useUpdateDonation = () => {
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (data: { id: number; status: string }) =>
      updateDonationStatus(data.id, data.status),
    onSuccess: (data) => {
      console.log('Donation updated:', data);
    },
    onError: (err) => {
      console.error('Donation update error:', err);
      addNotification(
        'error',
        err.message || 'Failed to update donation',
        3000
      );
    },
  });
};
