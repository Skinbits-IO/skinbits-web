import styles from './FarmCancelPopup.module.css';
import { useMutation } from '@tanstack/react-query';
import { cancelFarmSession } from '../../api';
import { FarmStatus } from '../../types';
import { setFarmingStatus } from '../../model';
import {
  Popup,
  PopupButton,
  useAppDispatch,
  useStatusNotification,
} from '../../../../shared';

interface IFarmCancelPopupProps {
  onClose: () => void;
}

export const FarmCancelPopup = ({ onClose }: IFarmCancelPopupProps) => {
  const dispatch = useAppDispatch();
  const addNotification = useStatusNotification();

  const cancelFarmMutation = useMutation({
    mutationFn: () => cancelFarmSession(),
    onSuccess: () => {
      dispatch(setFarmingStatus(FarmStatus.Inactive));
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
    <Popup onClose={onClose}>
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
    </Popup>
  );
};
