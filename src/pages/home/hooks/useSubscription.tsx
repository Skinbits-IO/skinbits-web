import { useEffect, useState } from 'react';

export const useSubscription = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('subscription-popup-last-shown');
    if (lastShown) {
      if (Date.now() - +lastShown > 2 * 24 * 60 * 60 * 1000) {
        localStorage.setItem('subscription-popup-last-shown', Date.now() + '');
        setShow(true);
      }
    } else {
      localStorage.setItem('subscription-popup-last-shown', Date.now() + '');
      setShow(true);
    }
  }, []);

  return { show, setShow };
};
