import axios from 'axios';
import { api } from '../../../shared';
import { FarmingSession } from '../types';

// exactly what the server returns
interface RawFarmingSession {
  farming_session_id: number;
  start_time: string;
  end_time: string;
  amount_farmed: number;
  is_claimed: boolean;
  telegram_id: number;
}

interface FarmingStatus {
  canClaim: boolean;
  session?: FarmingSession;
}

export async function getFarmingStatus(): Promise<FarmingStatus> {
  try {
    const resp = await api.get<RawFarmingSession>('/farming/status');
    const raw = resp.data;

    const session: FarmingSession = {
      sessionId: raw.farming_session_id,
      startTime: raw.start_time,
      endTime: raw.end_time,
      amountFarmed: raw.amount_farmed,
      isClaimed: raw.is_claimed,
      telegramId: raw.telegram_id,
    };

    const now = Date.now();
    const ended = new Date(session.endTime).getTime();
    const canClaim = now >= ended && !session.isClaimed;

    return { canClaim, session };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { canClaim: false };
    }
    throw err;
  }
}
