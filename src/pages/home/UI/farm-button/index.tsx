import { useNavigate } from 'react-router';
import { RocketIcon } from '../../../../components';
import { useStatusNotification, useUserGameInfo } from '../../../../shared';
import styles from './FarmButton.module.css';
import { FarmStatus } from '../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { claimFarmSession, startFarmSession } from '../../api';
import { formatTimeRemaining, toIsoUtcNoMs } from '../../utils';

interface IFarmButtonProps {
  status: FarmStatus;
  progress: number;
  endTime: string;
  openPopup: () => void;
}

export const FarmButton = ({
  status,
  progress,
  endTime,
  openPopup,
}: IFarmButtonProps) => {
  const navigate = useNavigate();
  const addNotification = useStatusNotification();
  const queryClient = useQueryClient();

  const { user } = useUserGameInfo();
  const isFarmingAvailable = user?.farmLevel !== 0;

  const getButtonText = (): string => {
    switch (status) {
      case FarmStatus.Inactive:
        return 'Start farming for 4h';
      case FarmStatus.Active:
        return `Farming ends in ${formatTimeRemaining(endTime)}`;
      case FarmStatus.Claim:
        return 'Claim farmed rockets';
      case FarmStatus.Buy:
      default:
        return 'Buy farm for 250 000';
    }
  };

  const startFarmMutation = useMutation({
    mutationFn: (data: { startTime: string; amountFarmed: number }) =>
      startFarmSession(data.startTime, data.amountFarmed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-availability'] });
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to start farm session',
        3000
      );
    },
  });

  const claimFarmMutation = useMutation({
    mutationFn: (data: { amountFarmed: number }) =>
      claimFarmSession(data.amountFarmed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-availability'] });
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to claim farm session',
        3000
      );
    },
  });

  return (
    <div
      className={styles.background}
      style={
        isFarmingAvailable
          ? {
              background:
                'linear-gradient(90deg, #E2C1F9 0%, #FEBD8E 33%, #FBFFE4 66%, #B6D0F7 100%)',
            }
          : { backgroundColor: 'rgba(255, 255, 255, 0.03)' }
      }
      onClick={() => {
        if (status === FarmStatus.Active) {
          openPopup();
        } else if (status === FarmStatus.Inactive) {
          startFarmMutation.mutate({
            startTime: toIsoUtcNoMs(),
            amountFarmed: (user?.farmLevel ?? 1) * 100000,
          });
        } else if (status === FarmStatus.Buy) {
          navigate('/upgrade');
        } else if (status === FarmStatus.Claim) {
          claimFarmMutation.mutate({
            amountFarmed: (user?.farmLevel ?? 1) * 100000,
          });
        }
      }}
    >
      {!isFarmingAvailable && (
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      )}
      <div className={styles.content}>
        <p
          className={
            isFarmingAvailable
              ? styles.activeButtonText
              : styles.unavailableButtonText
          }
        >
          {getButtonText()}
        </p>
        <div className={styles.rocketContainer}>
          {status === FarmStatus.Claim && (
            <p className={styles.rocketText}>
              {(user?.farmLevel ?? 1) * 100000}
            </p>
          )}
          <div
            className={styles.rocketIcon}
            style={
              isFarmingAvailable
                ? { backgroundColor: '#000000' }
                : {
                    background:
                      'linear-gradient(90deg, #E2C1F9 0%, #FEBD8E 33%, #FBFFE4 66%, #B6D0F7 100%)',
                  }
            }
          >
            <RocketIcon
              size={20}
              color={isFarmingAvailable ? '#FFFFFF' : '#000000'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
