import { RocketIcon } from '../../../../components';
import { RankUser } from '../../types';
import { formatPoints } from '../../utils';
import styles from './WinnerRankCard.module.css';

interface IWinnerRankCardProps {
  user: RankUser;
}

export const WinnerRankCard = ({ user }: IWinnerRankCardProps) => {
  const url = user!.photoUrl ?? window.location.origin + '/avatar.jpg';

  return (
    <div className={styles.background}>
      <div className={styles.rank}>#1</div>
      <div className={styles.userInfo}>
        <img src={url} alt="image" />
        <p>{user.firstName + ' ' + user.lastName}</p>
      </div>
      <div className={styles.totalEarned}>
        <p>{formatPoints(user.totalBalanceEarned)}</p>
        <RocketIcon size={16} color="#FFFFFF" />
      </div>
    </div>
  );
};
