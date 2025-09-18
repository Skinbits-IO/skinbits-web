import axios from 'axios';
import { api } from '../../../shared';
import { FarmingSession, FarmStatus } from '../types';

// exactly what the server returns now
interface RawFarmingSession {
  farming_session_id: number;
  start_time: string;
  end_time: string;
  amount_farmed: number;
  is_claimed: boolean;
  telegram_id: number;
}

interface RawFarmingStatus {
  status: string;
  lastSession?: RawFarmingSession | null;
}

interface FarmingStatus {
  status: FarmStatus;
  session?: FarmingSession;
}

export async function getFarmingStatus(): Promise<FarmingStatus> {
  try {
    const resp = await api.get<RawFarmingStatus>('/farming/status');
    const raw = resp.data;

    let session: FarmingSession | undefined;
    if (raw.lastSession) {
      session = {
        sessionId: raw.lastSession.farming_session_id,
        startTime: raw.lastSession.start_time,
        endTime: raw.lastSession.end_time,
        amountFarmed: raw.lastSession.amount_farmed,
        isClaimed: raw.lastSession.is_claimed,
        telegramId: raw.lastSession.telegram_id,
      };
    }

    return { status: raw.status as FarmStatus, session };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { status: FarmStatus.Inactive };
    }
    throw err;
  }
}
