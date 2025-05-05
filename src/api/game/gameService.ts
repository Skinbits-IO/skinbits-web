import axios from 'axios';
import { GameSession } from '../../types';
import { api } from '../api';

export async function uploadGameSession(session: GameSession) {
  try {
    const response = await api.post('/gameSession/add', {
      start_time: session.startTime,
      end_time: session.endTime,
      total_taps: session.totalTaps,
      balance_earned: session.balanceEarned,
      boosts_used: session.boostsUsed,
    });

    return response.data;
  } catch (error) {
    let errorMessage = 'Failed to get user!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
