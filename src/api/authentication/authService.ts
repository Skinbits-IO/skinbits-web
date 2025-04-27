import { SERVER_URL } from '../../constants';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * Log in a user by Telegram ID.
 *
 * @param telegramId - the user's Telegram ID
 * @param firstName - the user's Telegram First Name
 * @param hash - the hash provided by Telegram
 * @returns the access and refresh tokens
 * @throws Error with message "User not found" if the server returns 404
 * @throws Error with message "Failed to login" for any other non-OK response
 */
export async function login(
  telegramId: number,
  firstName: string,
  hash: string
): Promise<LoginResponse> {
  const response = await fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      telegram_id: telegramId,
      first_name: firstName,
      hash: hash,
    }),
  });

  if (response.ok) {
    return response.json() as Promise<LoginResponse>;
  } else if (response.status === 404) {
    throw new Error('User not found');
  } else {
    const text = await response.text().catch(() => '');
    throw new Error(`Failed to login: ${response.status} ${text}`);
  }
}
