import axios from 'axios';
import { api } from '../../../shared';

interface FarmAvailability {
  canFarm: boolean;
  message: string;
  endsAt?: string;
  claimed?: boolean;
}

export async function checkFarmAvailability(): Promise<FarmAvailability> {
  try {
    const resp = await api.get<{
      message: { success: boolean; message: string };
    }>('/farming/isAvailableToFarm');
    const { success, message } = resp.data.message;
    if (success) {
      return { canFarm: true, message };
    }
    const endsAtMatch = message.match(/Ends at:\s*([^\.]+)/);
    const claimedMatch = message.match(/Claimed:\s*(true|false)/);
    const endsAt = endsAtMatch
      ? new Date(endsAtMatch[1]).toISOString()
      : undefined;
    const claimed = claimedMatch ? claimedMatch[1] === 'true' : undefined;
    return { canFarm: false, message, endsAt, claimed };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const { success, message } = err.response.data as {
        success: boolean;
        message: string;
      };
      const endsAtMatch = message.match(/Ends at:\s*([^\.]+)/);
      const claimedMatch = message.match(/Claimed:\s*(true|false)/);
      const endsAt = endsAtMatch
        ? new Date(endsAtMatch[1]).toISOString()
        : undefined;
      const claimed = claimedMatch ? claimedMatch[1] === 'true' : undefined;
      return { canFarm: success, message, endsAt, claimed };
    }
    throw err;
  }
}

interface ClaimAvailability {
  canClaim: boolean;
  message: string;
}

export async function checkClaimAvailability(): Promise<ClaimAvailability> {
  try {
    const resp = await api.get<{
      message: {
        success: boolean;
        message: string;
      };
    }>('/farming/isAvailableToClaim');

    return {
      canClaim: resp.data.message.success,
      message: resp.data.message.message,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data) {
      const data = err.response.data as {
        success: boolean;
        message: string;
      };
      return {
        canClaim: data.success,
        message: data.message,
      };
    }
    throw err;
  }
}

interface FarmingSession {
  id: number;
  start_time: string;
  end_time: string;
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

export async function claimFarmSession(amountFarmed: number) {
  try {
    const response = await api.post<FarmingSession>(`/farming/claimFarm`, {
      amount_farmed: amountFarmed,
    });
    return response.data;
  } catch (error) {
    let errorMessage = `Failed to claim farming session`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
