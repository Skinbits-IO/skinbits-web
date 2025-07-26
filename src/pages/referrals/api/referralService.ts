import axios from 'axios';
import { api } from '../../../shared';

/**
 * The shape the server actually returns
 */
export interface ReferralEntryDTO {
  referral_entry_id: string;
  referrer_id: string;
  referred_user_id: string;
  referral_token: string;
  referral_date: string;
  status: string;
}

/**
 * Your app‐friendly version
 */
export interface ReferralEntry {
  id: string;
  referrerId: string;
  referredUserId: string;
  token: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'rejected';
}

export async function getReferrals(userId: number): Promise<ReferralEntry[]> {
  try {
    const resp = await api.get<ReferralEntryDTO[]>(
      `/referral/referrer/${userId}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return resp.data.map((dto) => ({
      id: dto.referral_entry_id,
      referrerId: dto.referrer_id,
      referredUserId: dto.referred_user_id,
      token: dto.referral_token,
      date: new Date(dto.referral_date),
      status: dto.status as ReferralEntry['status'],
    }));
  } catch (error) {
    let errorMessage = 'Failed to get referrals!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
