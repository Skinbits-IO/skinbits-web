import { useNavigate } from 'react-router';
import {
  RocketIcon,
  useAppDispatch,
  useAppSelector,
  useStatusNotification,
  useUser,
} from '../../../../shared';
import styles from './FarmButton.module.css';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { setUser } from '../../../../entities';
import { setFarmingSession, setFarmingStatus } from '../../model';
import { claimFarmSession, startFarmSession } from '../../api';
import { formatTimeRemaining, toIsoUtcNoMs } from '../../utils';
import { FarmStatus } from '../../types';
import { useFarmStatus } from '../../hooks';
import { FarmButtonSkeleton } from '../farm-button-skeleton';

interface IFarmButtonProps {
  openPopup: () => void;
}

export const FarmButton = ({ openPopup }: IFarmButtonProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const addNotification = useStatusNotification();

  const { user } = useUser();
  const { status, session } = useAppSelector((state) => state.farm);
  const { isPendingClaim, isPendingFarm } = useFarmStatus();

  const isFarmingAvailable = user?.farmLevel !== 0;
  const progress = 100 * (user!.balance / 250000);
  const [timeLeft, setTimeLeft] = useState<string>('');

  const startFarmMutation = useMutation({
    mutationFn: (data: { startTime: string; amountFarmed: number }) =>
      startFarmSession(data.startTime, data.amountFarmed),
    onSuccess: (data) => {
      dispatch(setFarmingSession(data));
      dispatch(setFarmingStatus(FarmStatus.Active));
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
    mutationFn: () => claimFarmSession(),
    onSuccess: (data) => {
      dispatch(setFarmingSession(null));
      dispatch(setFarmingStatus(FarmStatus.Inactive));
      dispatch(setUser(data));
    },
    onError: (err) => {
      addNotification(
        'error',
        err.message || 'Failed to claim farm session',
        3000
      );
    },
  });

  // live countdown: recalc every minute while active
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (session) {
      const update = () => {
        setTimeLeft(formatTimeRemaining(session.endTime));
      };
      update();
      timer = setInterval(update, 60_000);
    }
    return () => clearInterval(timer);
  }, [session]);

  const getButtonText = (): string => {
    switch (status) {
      case FarmStatus.Inactive:
        return 'Start farming for 4h';
      case FarmStatus.Active:
        return `Farming ends in ${timeLeft}`;
      case FarmStatus.Claim:
        return 'Claim farmed rockets';
      case FarmStatus.Buy:
      default:
        return 'Buy farm for 250 000';
    }
  };

  return isPendingClaim || isPendingFarm ? (
    <FarmButtonSkeleton />
  ) : (
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
          claimFarmMutation.mutate();
        }
      }}
    >
      {status === FarmStatus.Buy && (
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      )}
      <div className={styles.content}>
        {startFarmMutation.isPending || claimFarmMutation.isPending ? (
          <span className={styles.loader} />
        ) : (
          <div className={styles.spaceBetween}>
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
              {(status === FarmStatus.Claim ||
                status === FarmStatus.Active) && (
                <p className={styles.rocketText}>
                  {status === FarmStatus.Claim
                    ? session?.amountFarmed
                    : (user?.farmLevel ?? 1) * 100000}
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
        )}
      </div>
    </div>
  );
};
