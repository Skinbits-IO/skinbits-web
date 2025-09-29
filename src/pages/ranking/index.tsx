import styles from './RankingPage.module.css';
import { Header } from '../../widgets';
import {
  ProgressWidget,
  RankCard,
  RankCardSkeleton,
  WinnerRankCard,
} from './UI';
import { Rank, useUser } from '../../shared';
import { useLeaderboard, useUserLeaderboard } from './hooks';
import { RankEnum } from '../../shared';
import { useEffect, useRef } from 'react';

export const RankingPage = () => {
  const { user } = useUser();
  const rank = user!.rank as RankEnum;

  const { users, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useLeaderboard(rank, 10);

  const { data: userRank, isPending: isUserPending } = useUserLeaderboard();

  // intersection observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '200px 0px', threshold: 0 },
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        {isUserPending ? (
          <RankCardSkeleton />
        ) : (
          userRank &&
          (userRank.rank === 1 ? (
            <WinnerRankCard user={userRank} />
          ) : (
            <RankCard user={userRank} />
          ))
        )}

        <div className={styles.ranking}>
          {isPending ? (
            Array.from({ length: 8 }).map((_, i) => (
              <RankCardSkeleton key={`pending-${i}`} />
            ))
          ) : (
            <>
              {users.map((u, idx) =>
                idx === 0 ? (
                  <WinnerRankCard key={u.telegramId} user={u} />
                ) : (
                  <RankCard key={u.telegramId} index={idx + 1} user={u} />
                ),
              )}

              {hasNextPage && (
                <div ref={loadMoreRef} className="h-1 w-full opacity-0" />
              )}

              {isFetchingNextPage &&
                Array.from({ length: 5 }).map((_, i) => (
                  <RankCardSkeleton key={`next-${i}`} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
