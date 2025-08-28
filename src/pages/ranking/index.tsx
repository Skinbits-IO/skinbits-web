import styles from './RankingPage.module.css';
import { Header } from '../../widgets';
import {
  ProgressWidget,
  RankCard,
  RankCardSkeleton,
  WinnerRankCard,
} from './UI';
import { LoadMore, Rank, useUser } from '../../shared';
import { useLeaderboard, useUserLeaderboard } from './hooks';
import { RankEnum } from '../../shared';
import { useEffect, useState } from 'react';
import { RankUser } from './types';

export const RankingPage = () => {
  const { user } = useUser();
  const rank = user!.rank as RankEnum;

  // pagination state:
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data: leaderboard, isFetching: isLeaderboardLoading } =
    useLeaderboard(rank, page, limit);

  const [users, setUsers] = useState<RankUser[]>([]);
  useEffect(() => {
    if (leaderboard)
      setUsers((prev) => {
        return [...prev, ...leaderboard];
      });
  }, [leaderboard]);

  const { data, isPending } = useUserLeaderboard();

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.upperSection}>
        <Rank rank={rank} />
        <ProgressWidget
          rank={rank}
          totalEarned={user?.totalBalanceEarned ?? 0}
        />
      </div>
      <div className={styles.rankings}>
        {isPending ? (
          <RankCardSkeleton />
        ) : (
          data &&
          (data.rank === 1 ? (
            <WinnerRankCard user={data} />
          ) : (
            <RankCard user={data} />
          ))
        )}
        <div className={styles.ranking}>
          {users.map((u, idx) =>
            idx === 0 ? (
              <WinnerRankCard key={idx} user={u} />
            ) : (
              <RankCard key={idx} index={idx + 1} user={u} />
            )
          )}
          {isLeaderboardLoading &&
            !leaderboard &&
            Array.from({ length: 7 }).map((_, i) => (
              <RankCardSkeleton key={`loading-${i}`} />
            ))}

          {users.length === (page + 1) * limit && (
            <LoadMore
              isPending={isLeaderboardLoading}
              onClick={() => setPage((p) => p + 1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
