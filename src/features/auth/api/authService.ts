import { API_BASE } from '../../../shared';

export async function login(
  initData: string
): Promise<{ accessToken: string; refreshToken: string }> {
  const response = await fetch(`${API_BASE}/auth/login`, {
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
