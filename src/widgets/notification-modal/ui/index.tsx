import { useEffect, useState } from 'react';
import { NotificationIcon } from './notification-icon';
import { NotificationPopup } from './notification-popup';
import { AnimatePresence } from 'framer-motion';
import { useActiveNotifications } from '../../../entities';

export const NotificationModal = () => {
  const [show, setShow] = useState<boolean>(false);

  const { hasUnread } = useActiveNotifications(5);

  useEffect(() => {
    if (hasUnread) {
      setShow(true);
    }
  }, [hasUnread]);

  return (
    <>
      <AnimatePresence>
        {show && <NotificationPopup onClose={() => setShow(false)} />}
      </AnimatePresence>
      <button
        onClick={() => setShow(true)}
        className="relative h-[3.0625rem] w-[3.0625rem] border-[0.125rem] border-white/10 rounded-full bg-transparent flex items-center justify-center"
      >
        {hasUnread && (
          <div className="absolute top-[1px] right-[3px] h-[10px] w-[10px] rounded-full bg-[#C1575A] z-10" />
        )}
        <NotificationIcon size={24} color="#8A8A8A" />
      </button>
    </>
  );
};
