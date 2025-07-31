import styles from './RankingPage.module.css';
import { Header, Rank } from '../../components';
import {
  ProgressWidget,
  RankCard,
  RankCardSkeleton,
  WinnerRankCard,
} from './UI';
import { useUser } from '../../shared';
import { useLeaderboard, useUserLeaderboard } from './hooks';
import { Rank as RankEnum } from '../../shared';
import { useState } from 'react';

export const RankingPage = () => {
  const { user } = useUser();
  const rank = user!.rank as RankEnum;

  // pagination state:
  const [page, setPage] = useState(0);
  const limit = 10;

  const { data: leaderboard, isFetching: isLeaderboardLoading } =
    useLeaderboard(rank, page, limit);
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
          {leaderboard &&
            leaderboard.map((u, idx) =>
              idx === 0 && page === 0 ? (
                <WinnerRankCard key={u.telegramId} user={u} />
              ) : (
                <RankCard
                  key={u.telegramId}
                  index={page * limit + idx + 1}
                  user={u}
                />
              )
            )}
          {isLeaderboardLoading &&
            page > 0 &&
            // show skeleton only when loading more
            Array.from({ length: limit }).map((_, i) => (
              <RankCardSkeleton key={`loading-${i}`} />
            ))}

          {/* load more */}
          {leaderboard && leaderboard.length === (page + 1) * limit && (
            <button
              className={styles.loadMoreButton}
              onClick={() => setPage((p) => p + 1)}
              disabled={isLeaderboardLoading}
            >
              {isLeaderboardLoading ? 'Loading…' : 'Load more'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
