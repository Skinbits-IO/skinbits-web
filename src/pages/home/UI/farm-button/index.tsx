import { RocketIcon } from '../../../../components';
import styles from './FarmButton.module.css';

interface IFarmButtonProps {
  status: string;
  progress: number;
}

export const FarmButton = ({ status, progress }: IFarmButtonProps) => {
  const isFarmingAvailable = status !== 'unavailable';

  const buttonText = (): string => {
    switch (status) {
      case 'active':
        return 'Farming Ends in ';
      case 'inactive':
        return 'Start farming for 6h';
      case 'buyable':
        return 'Buy farm';
      default:
        return 'Farming on level 5';
    }
  };

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
          {buttonText()}
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
