export const ranks: Map<
  string,
  {
    color: string;
    milestone: number;
    reward: number;
  }
> = new Map<
  string,
  {
    color: string;
    milestone: number;
    reward: number;
  }
>([
  [
    'bronze',
    {
      color: '#CD7F32',
      milestone: 100000,
      reward: 50000,
    },
  ],
  [
    'silver',
    {
      color: '#C0C0C0',
      milestone: 1000000,
      reward: 250000,
    },
  ],
  [
    'gold',
    {
      color: '#FFD700',
      milestone: 10000000,
      reward: 1000000,
    },
  ],
  [
    'platinum',
    {
      color: '#E5E4E2',
      milestone: 100000000,
      reward: 10000000,
    },
  ],
  [
    'diamond',
    {
      color: '#B9F2FF',
      milestone: 1000000000,
      reward: 100000000,
    },
  ],
]);
