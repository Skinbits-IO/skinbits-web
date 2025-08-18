import { motion } from 'motion/react';
import styles from './index.module.css';
import { CloseButton } from './close-button';
import { PropsWithChildren } from 'react';

interface IPopupProps {
  onClose: () => void;
}

export const Popup = ({
  onClose,
  children,
}: IPopupProps & PropsWithChildren) => {
  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div style={{ marginBottom: '-20px' }}>
          <CloseButton onTap={onClose} />
        </div>
      </motion.div>
      {children}
    </>
  );
};
