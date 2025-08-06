import styles from './UpgradeCard.module.css';
import { ArrowIcon } from '../../../../components';
import { useUser } from '../../../../shared';

interface IUpgradeCardProps {
  title: string;
  photoUrl: string;
  price: number;
  level: number;
  onClick: () => void;
}

export const UpgradeCard = ({
  title,
  photoUrl,
  price,
  level,
  onClick,
}: IUpgradeCardProps) => {
  const { subscription } = useUser();
  const formatedPrice = new Intl.NumberFormat('en-US').format(price);

  const maxLevel = subscription && subscription.isActive ? 20 : 15;
  const levelPercentage = level ? Math.min(level / maxLevel, 1) * 100 : 0;

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <img src={window.location.origin + photoUrl} className={styles.image} />
        <div className={styles.textContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.price}>
            {level === maxLevel ? 'Max' : formatedPrice}
          </p>
        </div>
      </div>
      <div className={styles.row}>
        {level !== 0 && (
          <div
            className={styles.levelWrapper}
            style={{
              background: `conic-gradient(#D2F7B6 ${levelPercentage}%, rgba(217, 217, 217, 0.1) ${levelPercentage}% 100%)`,
            }}
          >
            <div className={styles.levelContainer}>{level}</div>
          </div>
        )}
        <button
          className={styles.button}
          disabled={price === 0}
          onClick={() => onClick()}
        >
          <ArrowIcon size={14} />
        </button>
      </div>
    </div>
  );
};
