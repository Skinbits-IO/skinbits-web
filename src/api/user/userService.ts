import { API_BASE } from '../../constants';

/**
 * Registers a new user and returns access + refresh tokens on success.
 */
export async function addUser(initData: string) {
  const res = await fetch(`${API_BASE}/user/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to add user: ${res.status} ${text}`);
  }
  return res.json();
}
