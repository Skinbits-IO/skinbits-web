export const DONATIONS_PRICE: Record<
  'ton' | 'star',
  { rockets: number; price: number }[]
> = {
  ton: [
    { rockets: 1e6, price: 0.2 },
    { rockets: 2 * 1e6, price: 0.5 },
    { rockets: 5 * 1e6, price: 1 },
    { rockets: 1e7, price: 2 },
    { rockets: 2.5 * 1e7, price: 5 },
    { rockets: 1e8, price: 20 },
  ],
  star: [
    { rockets: 1e6, price: 1 },
    { rockets: 2 * 1e6, price: 250 },
    { rockets: 5 * 1e6, price: 500 },
    { rockets: 1e7, price: 1000 },
    { rockets: 2.5 * 1e7, price: 2500 },
    { rockets: 1e8, price: 10000 },
  ],
};

export const PREMIUM_PLANS: Record<
  'free' | 'gold' | 'premium',
  {
    price: {
      ton: number;
      star: number;
    };
    bonuses: string[];
  }
> = {
  free: {
    price: {
      ton: 0,
      star: 0,
    },
    bonuses: [
      'No boost to levels',
      'Max level - 15 lvl',
      'Unlimited referrals',
      'Unlimited donations',
    ],
  },
  gold: {
    price: {
      ton: 0.2,
      star: 100,
    },
    bonuses: [
      '+5 to your levels',
      'Max level - 20 lvl',
      'Unlimited referrals',
      'x2 rewards for referrals',
    ],
  },
  premium: {
    price: {
      ton: 1,
      star: 250,
    },
    bonuses: [
      '+10 to your levels',
      'Max level - 20 lvl',
      'VIP telegram channel',
      'x5 rewards for referrals',
    ],
  },
};
