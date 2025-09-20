import { motion } from 'motion/react';
import { CloseButton } from './close-button';
import { PropsWithChildren } from 'react';

interface IPopupProps {
  onClose: () => void;
  scrollable?: boolean;
}

export const Popup = ({
  onClose,
  scrollable = true,
  children,
}: IPopupProps & PropsWithChildren) => {
  return (
    <>
      <motion.div
        className="fixed inset-0 w-full h-full bg-black/70 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={
          'fixed left-0 right-0 bottom-0 w-full z-30 bg-background px-5 pt-5 pb-[calc(18px+var(--tg-safe-area-inset-bottom,0rem))] rounded-t-[24px] flex flex-col items-end justify-start gap-10'
        }
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className="-mb-5">
          <CloseButton onTap={onClose} />
        </div>
        <div
          className={
            'h-fit w-full flex flex-col items-center justify-start gap-10 ' +
            (scrollable ? 'max-h-[90vh] overflow-y-auto scrollbar' : '')
          }
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};
