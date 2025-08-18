import { RankEnum } from '../../../shared';
import { User } from '../types';

export function getUserFromApi(data: any): User {
  return {
    telegramId: data.telegram_id,
    firstName: data.first_name,
    lastName: data.last_name,
    username: data.username ?? '',
    languageCode: data.language_code,
    isPremium: data.is_premium,
    photoUrl: data.photo_url,
    joinDate: data.join_date,
    tradeLink: data.trade_link,
    rank: (data.league as string).toLowerCase() as RankEnum,
    balance: data.balance,
    balanceBb: data.balance_bb,
    totalBalanceEarned: data.total_balance_earned,
    totalTaps: data.total_taps,
    farmLevel: data.farm_level,
    tapLevel: data.tap_level,
    fuelLevel: data.fuel_level,
    fuelboostQuantity: data.fuelboost_quantity ?? 0,
    tapboostQuantity: data.tapboost_quantity ?? 0,
  };
}
