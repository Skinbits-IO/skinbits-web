import { RocketIcon } from '../../../../components';
import { RankUser } from '../../types';
import { formatPoints } from '../../utils';
import styles from './RankCard.module.css';

interface IRankCardProps {
  index?: number;
  user: RankUser;
}

export const RankCard = ({ index, user }: IRankCardProps) => {
  const place = index ? index : user.rank ?? 0;
  const secondaryColor = place < 4 ? '#000000' : '#FFFFFF';
  const url =
    user!.photoUrl ?? window.location.origin + '/skinbits-web/avatar.jpg';

  return (
    <div
      className={styles.background}
      style={{
        backgroundColor:
          place < 4
            ? `rgba(255,255,255,${1 - place * 0.2})`
            : 'rgba(255,255,255,0.05)',
      }}
    >
      <div className={styles.userInfoContainer}>
        <div className={styles.rank}>{`#${place}`}</div>
        <div className={styles.userInfo}>
          <img src={url} alt="image" />
          <p style={{ color: secondaryColor }}>
            {user.firstName + ' ' + user.lastName}
          </p>
        </div>
      </div>
      <div className={styles.totalEarned}>
        <p style={{ color: secondaryColor }}>
          {formatPoints(user.totalBalanceEarned)}
        </p>
        <RocketIcon size={16} color={secondaryColor} opacity={0.8} />
      </div>
    </div>
  );
};
