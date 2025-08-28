import { RankEnum } from '../types';

export const RANKS: Map<
  RankEnum,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: RankEnum;
  }
> = new Map<
  RankEnum,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: RankEnum;
  }
>([
  [
    RankEnum.bronze,
    {
      color: '#CD7F32',
      milestone: 1e5,
      reward: 50000,
      nextRank: RankEnum.silver,
    },
  ],
  [
    RankEnum.silver,
    {
      color: '#C0C0C0',
      milestone: 1e6,
      reward: 250000,
      nextRank: RankEnum.gold,
    },
  ],
  [
    RankEnum.gold,
    {
      color: '#FFD700',
      milestone: 1e8,
      reward: 1e6,
      nextRank: RankEnum.platinum,
    },
  ],
  [
    RankEnum.platinum,
    {
      color: '#E5E4E2',
      milestone: 1e9,
      reward: 1e7,
      nextRank: RankEnum.diamond,
    },
  ],
  [
    RankEnum.diamond,
    {
      color: '#B9F2FF',
      milestone: 1e12,
    },
  ],
]);
