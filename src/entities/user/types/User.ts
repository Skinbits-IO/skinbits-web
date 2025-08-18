import { RankEnum } from '../../../shared';

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
  rank: RankEnum;
  balance: number;
  balanceBb: number;
  totalBalanceEarned: number;
  totalTaps: number;
  farmLevel: number;
  tapLevel: number;
  fuelLevel: number;
  tapboostQuantity: number;
  fuelboostQuantity: number;
}
