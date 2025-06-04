import axios from 'axios';
import { api, API_BASE, Rank, User, UserGameInfo } from '../../../shared';

export async function addUser(initData: string): Promise<{
  user: User;
  token: { accessToken: string; refreshToken: string };
}> {
  const response = await fetch(`${API_BASE}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Failed to add user: ${response.status} ${text}`);
  }
  return response.json();
}

export async function getUser(): Promise<{
  user: User;
  userGameInfo: UserGameInfo;
}> {
  try {
    const response = await api.get('/user', {
      headers: { 'Content-Type': 'application/json' },
    });
    const data = response.data.data;
    const userGameInfo: UserGameInfo = {
      farmLevel: data.farm_level,
      tapLevel: data.tap_level,
      fuelLevel: data.fuel_level,
      boost1Quantity: data.boost1_quantity,
      boost1ActivatedAt: data.boost1_activated_at,
      boost2Quantity: data.boost2_quantity,
      boost2ActivatedAt: data.boost2_activated_at,
    };

    const user: User = {
      telegramId: data.telegram_id,
      firstName: data.first_name,
      lastName: data.last_name,
      username: data.username,
      languageCode: data.language_code,
      isPremium: data.is_premium,
      photoUrl: data.photo_url,
      joinDate: data.join_date,
      tradeLink: data.trade_link,
      rank: (data.league as Rank).toLowerCase(),
      balance: data.balance,
      balanceBb: data.balance_bb,
    };

    return { user, userGameInfo };
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
