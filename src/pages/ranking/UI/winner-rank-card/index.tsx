import { RocketIcon } from '../../../../components';
import { RankUser } from '../../../../types';
import { formatPoints } from '../../utils/rankingUtils';
import styles from './WinnerRankCard.module.css';

interface IWinnerRankCardProps {
  user: RankUser;
}

export const WinnerRankCard = ({ user }: IWinnerRankCardProps) => {
  return (
    <div className={styles.background}>
      <div className={styles.rank}>{`#${user.place}`}</div>
      <div className={styles.userInfo}>
        <img src={user.photoUrl} alt="image" />
        <p>{user.fullName}</p>
      </div>
      <div className={styles.totalEarned}>
        <p>{formatPoints(user.totalEarned)}</p>
        <RocketIcon size={16} color="#FFFFFF" />
      </div>
    </div>
  );
};
