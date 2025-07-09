import { motion } from 'framer-motion';
import { PopupCloseButton, PopupButton } from '../../../../components';
import styles from './FarmCancelPopup.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useStatusNotification } from '../../../../shared';
import { cancelFarmSession } from '../../api';

interface IFarmCancelPopupProps {
  onClose: () => void;
}

export const FarmCancelPopup = ({ onClose }: IFarmCancelPopupProps) => {
  const addNotification = useStatusNotification();
  const queryClient = useQueryClient();

  const cancelFarmMutation = useMutation({
    mutationFn: () => cancelFarmSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-availability'] });
      onClose();
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to cancel farm session',
        3000
      );
    },
  });

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
        <div className={styles.closeWrapper}>
          <PopupCloseButton onTap={onClose} />
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.title}>Cancel Farming Session?</div>
        </div>

        <div className={styles.description}>
          Are you sure you want to cancel your current farming session?
          <br />
          Any unclaimed rewards or progress will be lost.
        </div>

        <div className={styles.buttonRow}>
          <PopupButton text="No, Keep Farming" onClick={onClose} />
          <PopupButton
            text="Yes, Cancel"
            isRequestPending={cancelFarmMutation.isPending}
            onClick={() => {
              cancelFarmMutation.mutate();
            }}
          />
        </div>
      </motion.div>
    </>
  );
};
