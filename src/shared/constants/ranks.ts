export const RANKS: Map<
  string,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: string;
  }
> = new Map<
  string,
  {
    color: string;
    milestone: number;
    reward?: number;
    nextRank?: string;
  }
>([
  [
    'bronze',
    {
      color: '#CD7F32',
      milestone: 1e5,
      reward: 50000,
      nextRank: 'silver',
    },
  ],
  [
    'silver',
    {
      color: '#C0C0C0',
      milestone: 1e6,
      reward: 250000,
      nextRank: 'gold',
    },
  ],
  [
    'gold',
    {
      color: '#FFD700',
      milestone: 1e8,
      reward: 1e6,
      nextRank: 'platinum',
    },
  ],
  [
    'platinum',
    {
      color: '#E5E4E2',
      milestone: 1e9,
      reward: 1e7,
      nextRank: 'diamond',
    },
  ],
  [
    'diamond',
    {
      color: '#B9F2FF',
      milestone: 1e12,
    },
  ],
]);
