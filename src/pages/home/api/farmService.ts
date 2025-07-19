import axios from 'axios';
import { api, FarmingSession } from '../../../shared';

export async function checkFarmAvailability(): Promise<boolean> {
  try {
    const resp = await api.get<boolean>('/farming/isAvailableToFarm');
    return resp.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 400) {
      return false;
    }
    throw err;
  }
}

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
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response?.status === 404) {
      return { canClaim: false };
    }
    throw err;
  }
}

export async function startFarmSession(
  startTime: string,
  amountFarmed: number
): Promise<FarmingSession> {
  try {
    const response = await api.post<FarmingSession>(`/farming/activate`, {
      start_time: startTime,
      amount_farmed: amountFarmed,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to start farming session`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

export async function cancelFarmSession() {
  try {
    const response = await api.delete(`/farming/cancel`);
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to cancel farming session`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

export async function claimFarmSession() {
  try {
    const response = await api.post<FarmingSession>(`/farming/claim`);
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to claim farming session`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
