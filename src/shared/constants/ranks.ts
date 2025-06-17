import { Rank } from '../types';

export const RANKS: Map<
  Rank,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: Rank;
  }
> = new Map<
  Rank,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: Rank;
  }
>([
  [
    Rank.bronze,
    {
      color: '#CD7F32',
      milestone: 1e5,
      reward: 50000,
      nextRank: Rank.silver,
    },
  ],
  [
    Rank.silver,
    {
      color: '#C0C0C0',
      milestone: 1e6,
      reward: 250000,
      nextRank: Rank.gold,
    },
  ],
  [
    Rank.gold,
    {
      color: '#FFD700',
      milestone: 1e8,
      reward: 1e6,
      nextRank: Rank.platinum,
    },
  ],
  [
    Rank.platinum,
    {
      color: '#E5E4E2',
      milestone: 1e9,
      reward: 1e7,
      nextRank: Rank.diamond,
    },
  ],
  [
    Rank.diamond,
    {
      color: '#B9F2FF',
      milestone: 1e12,
    },
  ],
]);
