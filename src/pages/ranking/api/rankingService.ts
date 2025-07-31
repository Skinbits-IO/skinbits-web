import { api } from '../../../shared';
import { RankUser } from '../types';

interface RawRankUser {
  telegram_id: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  photo_url: string | null;
  rank?: string;
  total_balance_earned: number;
  total_taps: number;
}

/**
 * Convert one raw server object into your RankUser type
 */
function parseRankUser(raw: RawRankUser): RankUser {
  return {
    telegramId: Number(raw.telegram_id),
    firstName: raw.first_name,
    lastName: raw.last_name ?? '',
    username: raw.username ?? '',
    photoUrl: raw.photo_url ?? undefined,
    rank: raw.rank != null ? Number(raw.rank) : undefined,
    totalBalanceEarned: raw.total_balance_earned,
    totalTaps: raw.total_taps,
  };
}

export async function getTopUsersByLeague(
  league: string,
  skip: number,
  limit: number
): Promise<RankUser[]> {
  const resp = await api.get<RawRankUser[]>(`/user/leaderboard`, {
    params: { league: league.toUpperCase(), skip, limit },
  });
  return resp.data.map(parseRankUser);
}

/**
 * Fetch and parse the single “my rank” endpoint
 */
export async function getUserRankInLeague(): Promise<RankUser> {
  const resp = await api.get<RawRankUser>(`/user/leaderboard/rank`);
  return parseRankUser(resp.data);
}
