import axios from 'axios';
import { api } from '../../../shared';
import { FarmingSession } from '../types';
import { getUserFromApi, User } from '../../../entities';

interface RawFarmingSession {
  farming_session_id: number;
  start_time: string;
  end_time: string;
  amount_farmed: number;
  is_claimed: boolean;
  telegram_id: number;
}

export async function startFarmSession(
  startTime: string,
  amountFarmed: number
): Promise<FarmingSession> {
  try {
    const response = await api.post<RawFarmingSession>(`/farming/activate`, {
      start_time: startTime,
      amount_farmed: amountFarmed,
    });

    const raw = response.data;
    const session: FarmingSession = {
      sessionId: raw.farming_session_id,
      startTime: raw.start_time,
      endTime: raw.end_time,
      amountFarmed: raw.amount_farmed,
      isClaimed: raw.is_claimed,
      telegramId: raw.telegram_id,
    };

    return session;
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

export async function claimFarmSession(): Promise<User> {
  try {
    const response = await api.post<FarmingSession>(`/farming/claim`);
    const data = response.data;
    return getUserFromApi(data);
  } catch (error) {
    let errorMessage = `Failed to claim farming session`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
