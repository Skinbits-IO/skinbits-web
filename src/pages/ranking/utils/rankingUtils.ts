import { RankUser } from '../types';

export const findUserByName = (
  fullName: string,
  users: RankUser[]
): RankUser | null => {
  for (const u of users) {
    if (u.fullName === fullName) {
      return u;
    }
  }
  return null;
};

export function formatPoints(n: number): string {
  if (n >= 1_000_000_000_000) {
    // trillions
    const trillions = Math.floor(n / 1_000_000_000_000);
    return `${trillions} t`;
  }
  if (n >= 1_000_000_000) {
    // billions
    const billions = Math.floor(n / 1_000_000_000);
    return `${billions} b`;
  }
  if (n >= 1_000_000) {
    // millions
    const millions = Math.floor(n / 1_000_000);
    return `${millions} m`;
  }
  if (n >= 100_000) {
    // hundreds of thousands → thousands
    const thousands = Math.floor(n / 1_000);
    return `${thousands} k`;
  }
  if (n >= 1_000) {
    // space‑separate for all other thousands
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  // below 1,000 just the number
  return n.toString();
}
