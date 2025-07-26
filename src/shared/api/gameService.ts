import axios from 'axios';
import { api } from './api';
import { GameSession, User, UserGameInfo } from '../types';
import { getProperUserFromApi } from '../utils';

export async function uploadGameSession(
  session: GameSession
): Promise<{ user: User; userGameInfo: UserGameInfo }> {
  try {
    const response = await api.post('/gameSession', {
      start_time: session.startTime,
      end_time: session.endTime,
      total_taps: session.totalTaps,
      balance_earned: session.balanceEarned,
      boosts_used: session.boostsUsed,
    });

    const user = response.data.user;
    return getProperUserFromApi(user);
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
