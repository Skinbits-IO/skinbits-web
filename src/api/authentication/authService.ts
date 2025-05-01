import { API_BASE } from '../../constants';

/**
 * Log in a user
 *
 * @param initDAta - the user's Telegram data
 * @returns the access and refresh tokens
 * @throws Error with message "User not found" if the server returns 404
 * @throws Error with message "Failed to login" for any other non-OK response
 */
export async function login(initData: string) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ initData }),
  });

  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    throw new Error('User not found');
  } else {
    const text = await response.text().catch(() => '');
    throw new Error(`Failed to login: ${response.status} ${text}`);
  }
}
