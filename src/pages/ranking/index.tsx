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
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const RankingPage = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const rank = user!.rank as RankEnum;

  const { data: leaderboard, isPending: isLeaderboardPending } =
    useLeaderboard(rank);
  const { data, isPending } = useUserLeaderboard();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['leaderboard-top', rank] });
    queryClient.invalidateQueries({ queryKey: ['leaderboard-user'] });
  }, [user]);

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
          {isLeaderboardPending ? (
            <>
              <RankCardSkeleton />
              <RankCardSkeleton />
              <RankCardSkeleton />
              <RankCardSkeleton />
              <RankCardSkeleton />
              <RankCardSkeleton />
            </>
          ) : (
            leaderboard &&
            leaderboard.map((user, index) => {
              if (index === 0) {
                return <WinnerRankCard key={`${index}-key`} user={user} />;
              } else {
                return (
                  <RankCard
                    key={`${index}-key`}
                    index={index + 1}
                    user={user}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};
