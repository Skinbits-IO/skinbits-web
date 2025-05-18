import { RocketIcon } from '../../../../components';
import { RankUser } from '../../types';
import { formatPoints } from '../../utils';
import styles from './RankCard.module.css';

interface IRankCardProps {
  user: RankUser;
}

export const RankCard = ({ user }: IRankCardProps) => {
  const secondaryColor = user.place < 4 ? '#000000' : '#FFFFFF';

  return (
    <div
      className={styles.background}
      style={{
        backgroundColor:
          user.place < 4
            ? `rgba(255,255,255,${1 - user.place * 0.2})`
            : 'rgba(255,255,255,0.05)',
      }}
    >
      <div className={styles.userInfoContainer}>
        <div className={styles.rank}>{`#${user.place}`}</div>
        <div className={styles.userInfo}>
          <img src={user.photoUrl} alt="image" />
          <p style={{ color: secondaryColor }}>{user.fullName}</p>
        </div>
      </div>
      <div className={styles.totalEarned}>
        <p style={{ color: secondaryColor }}>
          {formatPoints(user.totalEarned)}
        </p>
        <RocketIcon size={16} color={secondaryColor} opacity={0.8} />
      </div>
    </div>
  );
};
