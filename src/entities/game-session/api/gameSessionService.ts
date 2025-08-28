import axios from 'axios';
import { GameSession } from '../types';
import { getUserFromApi, User } from '../../user';
import { api } from '../../../shared';

export async function uploadGameSession(session: GameSession): Promise<User> {
  try {
    const response = await api.post('/gameSession', {
      start_time: session.startTime,
      end_time: session.endTime,
      total_taps: session.totalTaps,
      balance_earned: session.balanceEarned,
      boosts_used: session.boostsUsed,
    });

    const user = response.data.user;
    return getUserFromApi(user);
  } catch (error) {
    let errorMessage = 'Failed to upload game session!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
