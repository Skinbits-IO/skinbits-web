/**
 * Given an ISO end time, returns the time remaining as formatted "Xh Ym".
 * If less than an hour remains, returns just "Ym". If time’s up, returns "0m".
 *
 * @param endsAt ISO timestamp (e.g. "2025-07-09T19:42:47.000Z")
 */
export function formatTimeRemaining(endsAt: string): string {
  const now = new Date();
  const end = new Date(endsAt);
  let diff = end.getTime() - now.getTime();

  if (diff <= 0) {
    return `0m`;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;
  const minutes = Math.floor(diff / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

export const toIsoUtcNoMs = (d: Date = new Date()) =>
  d.toISOString().replace(/\.\d{3}Z$/, 'Z');
