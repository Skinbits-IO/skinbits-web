import styles from './RankingPage.module.css';
import { Header, Rank } from '../../components';
import { ProgressWidget, RankCard, WinnerRankCard } from './UI';
import { RankUser } from './types';
import { useUser } from '../../shared';
import { useLeaderboard, useUserLeaderboard } from './hooks';
import { Rank as RankEnum } from '../../shared';

export const RankingPage = () => {
  const { user } = useUser();
  const rank = user!.rank as RankEnum;

  const { data: leaderboard, isPending: isLeaderboardPending } =
    useLeaderboard(rank);
  const { data, isPending } = useUserLeaderboard();

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.upperSection}>
        <Rank rank={rank} />
        <ProgressWidget rank={rank} totalEarned={10000} />
      </div>
      <div className={styles.rankings}>
        {!isPending &&
          data &&
          (data.place === 1 ? (
            <WinnerRankCard user={data} />
          ) : (
            <RankCard user={data} />
          ))}
        <div className={styles.ranking}>
          {!isLeaderboardPending &&
            leaderboard &&
            leaderboard.map((user: RankUser) => {
              if (user.place === 1) {
                return <WinnerRankCard key={`${user.place}-key`} user={user} />;
              } else {
                return <RankCard key={`${user.place}-key`} user={user} />;
              }
            })}
        </div>
      </div>
    </div>
  );
};
