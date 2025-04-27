import { SERVER_URL } from '../../constants';

export interface AddUserPostDataPayload {
  telegramId: number;
  hash: string;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
}

/**
 * Registers a new user and returns access + refresh tokens on success.
 */
export async function addUser(data: AddUserPostDataPayload) {
  const res = await fetch(`${SERVER_URL}/user/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      telegram_id: data.telegramId,
      hash: data.hash,
      first_name: data.firstName,
      last_name: data.lastName,
      username: data.username,
      language_code: data.languageCode,
      is_premium: data.isPremium,
      photo_url: data.photoUrl,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to add user: ${res.status} ${text}`);
  }
  return res.json();
}
