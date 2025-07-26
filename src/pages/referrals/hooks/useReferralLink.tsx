import { useMutation } from '@tanstack/react-query';
import { useStatusNotification } from '../../../shared';
import { generateReferralLink } from '../api';
import WebApp from '@twa-dev/sdk';

export const useReferralLink = () => {
  const addNotification = useStatusNotification();

  const shareReferralLink = (link: string) => {
    const text = `Join me on SkinBits and earn points! 🔥`;
    console.log('Attempting to share referral link:', link);

    // Method 1: Try Telegram protocol link
    if (WebApp.openTelegramLink) {
      try {
        const fullMessage = `${text} ${link}`;
        const shareUrl = `tg://msg_url?text=${encodeURIComponent(fullMessage)}`;
        WebApp.openTelegramLink(shareUrl);
        return;
      } catch (error) {
        console.warn('openTelegramLink failed:', error);
        // Continue to next method
      }
    }

    // Method 2: Try Web Share API (mobile)
    if (navigator.share) {
      try {
        console.log('Trying Web Share API...');
        navigator.share({
          title: 'SkinBits Referral',
          text: text,
          url: link,
        });
        return;
      } catch (error) {
        console.warn('Web Share API failed:', error);
        // Continue to next method
      }
    }

    // Method 3: Fallback to Telegram web share
    try {
      console.log('Using fallback web share...');
      const shareUrl =
        'https://t.me/share/url' +
        `?url=${encodeURIComponent(link)}` +
        `&text=${encodeURIComponent(text)}`;
      WebApp.openLink(shareUrl);
    } catch (error) {
      console.error('All share methods failed:', error);
      copyLinkToClipboard(link);
    }
  };

  // Copy to clipboard method
  const copyLinkToClipboard = (link: string) => {
    const text = `Join me on SkinBits and earn points! 🔥 ${link}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert('Referral link copied!');
          if (WebApp.HapticFeedback) {
            WebApp.HapticFeedback.notificationOccurred('success');
          }
        })
        .catch((err) => {
          console.error('Failed to copy to clipboard:', err);
          alert(`Your referral link: ${link}`);
        });
    } else {
      // Fallback for older browsers
      WebApp.showAlert(
        '📋 Copy & Share\n\n' +
          `${link}\n\n` +
          '👆 Tap and hold to select this text, then copy it.\n' +
          'Paste in any chat to share!'
      );
    }
  };

  return useMutation({
    mutationFn: () => generateReferralLink(),
    onSuccess: (link) => shareReferralLink(link),
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
