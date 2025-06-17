import { Rank } from '../Rank';

export interface User {
  telegramId: number;
  firstName: string;
  lastName: string;
  username: string;
  languageCode: string;
  isPremium: boolean;
  photoUrl: string;
  joinDate: string;
  tradeLink: string;
  rank: Rank;
  balance: number;
  balanceBb: number;
}
