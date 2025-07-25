import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { generateReferralLink } from '../api';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';

export const useReferralLink = () => {
  const addNotification = useStatusNotification();
  const [openTG, setOpenTG] = useState(true);

  const shareReferralLink = (link: string) => {
    const text = `Join me on SkinBits and earn points! 🔥`;

    // Method 1: Try inline query first (best for mini apps)
    if (WebApp.switchInlineQuery) {
      const fullText = `${text} ${link}`;
      WebApp.switchInlineQuery(fullText, ['users', 'groups', 'channels']);
      return;
    }

    // Method 2: Try Telegram protocol link
    if (WebApp.openTelegramLink) {
      const shareUrl = `tg://msg_url?url=${encodeURIComponent(
        link
      )}&text=${encodeURIComponent(text)}`;
      WebApp.openTelegramLink(shareUrl);
      return;
    }

    // Method 3: Fallback to web share
    const shareUrl =
      'https://t.me/share/url' +
      `?url=${encodeURIComponent(link)}` +
      `&text=${encodeURIComponent(text)}`;
    WebApp.openLink(shareUrl);
  };

  return useMutation({
    mutationFn: (data: { openTG: boolean }) => {
      setOpenTG(data.openTG);
      return generateReferralLink();
    },
    onSuccess: (link) => {
      console.log(link);
      if (openTG) {
        shareReferralLink(link);
      } else {
        // Just copy to clipboard if not opening Telegram
        if (navigator.clipboard) {
          const text = `Join me on SkinBits and earn points! 🔥 ${link}`;
          navigator.clipboard.writeText(text).then(() => {
            WebApp.showAlert?.('Referral link copied to clipboard!');
          });
        }
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
