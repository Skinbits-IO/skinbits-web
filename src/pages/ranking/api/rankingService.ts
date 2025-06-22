import { api } from '../../../shared';
import { RankUser } from '../types';

interface RawRankUser {
  telegram_id: string;
  first_name: string;
  last_name: string | null;
  username: string | null;
  photo_url: string | null;
  rank?: string; // e.g. "1"
  total_balance_earned: number; // e.g. 0
  total_taps: number; // e.g. 1820
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

/**
 * Fetch and parse the top‐100 list
 */
export async function getTopUsersByLeague(league: string): Promise<RankUser[]> {
  const resp = await api.get<RawRankUser[]>(`/user/leaderboard`, {
    params: { league: league.toUpperCase() },
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
