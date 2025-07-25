import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { generateReferralLink } from '../api';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';

export const useReferralLink = () => {
  const addNotification = useStatusNotification();
  const [openTG, setOpenTG] = useState(true);

  const shareInline = (link: string) => {
    const text = `Join me on SkinBits and earn points! 🔥 ${link}`;
    WebApp.switchInlineQuery(text, ['users', 'groups', 'channels']);
  };

  return useMutation({
    mutationFn: (data: { openTG: boolean }) => {
      setOpenTG(data.openTG);
      return generateReferralLink();
    },
    onSuccess: (link) => {
      console.log(link);
      if (openTG) {
        shareInline(link);
      }
    },
    onError: (err) => {
      console.error('Referral error:', err);
      addNotification(
        'error',
        err.message || 'Failed to generate referral link',
        3000
      );
    },
  });
};
