import axios from 'axios';
import { api } from '../../../shared';

/**
 * The shape the server actually returns now
 */
export interface ReferralEntryDTO {
  referral_entry_id: string;
  referrer_id: string;
  referred_user_id: string;
  referral_token: string;
  referral_date: string;
  status: string;
  referrer: {
    username: string | null;
    photo_url: string | null;
  };
  referredUser: {
    username: string | null;
    photo_url: string | null;
  };
}

/**
 * Your app‐friendly version
 */
export interface ReferralEntry {
  id: string;
  token: string;
  status: 'pending' | 'confirmed' | 'rejected';
  date: Date;
  referrerId: string;
  referredUserId: string;
  referrer: {
    username: string | null;
    photoUrl: string | null;
  };
  referredUser: {
    username: string | null;
    photoUrl: string | null;
  };
}

export async function getReferrals(userId: number): Promise<ReferralEntry[]> {
  try {
    const resp = await api.get<{ data: ReferralEntryDTO[] }>(
      `/referral/referrer/${userId}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return resp.data.data.map((dto) => ({
      id: dto.referral_entry_id,
      referrerId: dto.referrer_id,
      referredUserId: dto.referred_user_id,
      token: dto.referral_token,
      date: new Date(dto.referral_date),
      status: dto.status as ReferralEntry['status'],
      referrer: {
        username: dto.referrer.username,
        photoUrl: dto.referrer.photo_url,
      },
      referredUser: {
        username: dto.referredUser.username,
        photoUrl: dto.referredUser.photo_url,
      },
    }));
  } catch (error) {
    let errorMessage = 'Failed to get referrals!';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.error || errorMessage;
    }
    throw new Error(errorMessage);
  }
}
