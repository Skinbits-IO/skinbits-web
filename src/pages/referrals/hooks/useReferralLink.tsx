import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { generateReferralLink } from '../api';
import WebApp from '@twa-dev/sdk';
import { useState } from 'react';

export const useReferralLink = () => {
  const addNotification = useStatusNotification();
  const [openTG, setOpenTG] = useState(true);

  function shareReferralInChat(link: string) {
    const text = `Join me on SkinBits and earn points! 🔥\n${link}`;

    // @ts-ignore
    const tg = (WebApp as any).telegraph ?? (window as any).Telegram.WebApp;

    if (tg && typeof tg.switchInlineQueryCurrentChat === 'function') {
      // this will open the “send message” composer in the current chat
      tg.switchInlineQueryCurrentChat(text);
    } else {
      // fallback to t.me/share URL
      const shareUrl =
        'https://t.me/share/url' +
        `?url=${encodeURIComponent(link)}` +
        `&text=${encodeURIComponent(text)}`;

      WebApp.openLink(shareUrl);
    }
  }

  return useMutation({
    mutationFn: (data: { openTG: boolean }) => {
      setOpenTG(data.openTG);
      return generateReferralLink();
    },
    onSuccess: (link) => {
      console.log(link);
      if (openTG) {
        shareReferralInChat(link);
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
