export type RankUser = {
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
  photoUrl?: string;
  rank?: number;
  totalBalanceEarned: number;
  totalTaps: number;
};
