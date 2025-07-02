import { useNavigate } from 'react-router';
import { RocketIcon } from '../../../../components';
import { useUserGameInfo } from '../../../../shared';
import styles from './FarmButton.module.css';

interface IFarmButtonProps {
  progress: number;
}

export const FarmButton = ({ progress }: IFarmButtonProps) => {
  const navigate = useNavigate();
  const { user } = useUserGameInfo();
  const isFarmingAvailable = user?.farmLevel !== 0;

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
      onClick={() => navigate('/upgrade')}
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
          {user?.farmLevel !== 0
            ? 'Start farming for 6h'
            : 'Buy farm for 10 000'}
        </p>
        <div className={styles.rocketContainer}>
          {isFarmingAvailable && <p className={styles.rocketText}>10 000</p>}
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
