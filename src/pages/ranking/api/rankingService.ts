import axios from 'axios';
import { api, Rank } from '../../../shared';
import { RankUser } from '../types';

interface GetTopUsersResponse {
  success: true;
  message: string;
  data: RankUser[];
}

export async function getTopUsersByLeague(league: Rank) {
  try {
    const response = await api.get<GetTopUsersResponse>(`/user/leaderboard`, {
      data: { lague: league },
    });
    return response.data.data;
  } catch (error) {
    let errorMessage = `Failed get top users in ${league}`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}

interface GetUserRankInLeagueResponse {
  success: true;
  message: string;
  data: RankUser;
}

export async function getUserRankInLeague() {
  try {
    const response = await api.get<GetUserRankInLeagueResponse>(
      `/user/leaderboard/rank`
    );
    return response.data.data;
  } catch (error) {
    let errorMessage = `Failed get user place in league`;
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
