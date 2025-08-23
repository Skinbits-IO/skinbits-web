import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { saveTradeLink } from '../api';

export const useSaveTradeLink = (onSuccess: () => void) => {
  const addNotification = useStatusNotification();

  return useMutation({
    mutationFn: (tradeLink: string) => saveTradeLink(tradeLink),
    onSuccess: onSuccess,
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to save trade link',
        3000
      );
    },
  });
};
