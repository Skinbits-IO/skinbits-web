import axios from 'axios';
import { api } from './api';
import { GameSession } from '../types';

export async function uploadGameSession(session: GameSession) {
  console.log(session);
  try {
    const response = await api.post('/gameSession', {
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
