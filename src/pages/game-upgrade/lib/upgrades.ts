import { Card } from '../types';

export const LEVEL_PRICES: Map<number, number> = new Map<number, number>([
  [1, 0],
  [2, 500],
  [3, 1000],
  [4, 5000],
  [5, 10000],
  [6, 25000],
  [7, 50000],
  [8, 100000],
  [9, 250000],
  [10, 500000],
  [11, 1000000],
  [12, 2500000],
  [13, 5000000],
  [14, 7500000],
  [15, 10000000],
  [16, 12500000],
  [17, 15000000],
  [18, 20000000],
  [19, 30000000],
  [20, 50000000],
]);

export const FARM_LEVEL_PRICES: Map<number, number> = new Map<number, number>([
  [1, 250000],
  [2, 5000],
  [3, 10000],
  [4, 25000],
  [5, 50000],
  [6, 100000],
  [7, 250000],
  [8, 500000],
  [9, 1000000],
  [10, 2500000],
  [11, 3000000],
  [12, 5000000],
  [13, 7500000],
  [14, 10000000],
  [15, 12500000],
  [16, 15000000],
  [17, 25000000],
  [18, 50000000],
  [19, 75000000],
  [20, 100000000],
]);

export const UPGRADE_CARDS: Card[] = [
  {
    title: 'Fuel Amount',
    description: 'Increase the limit for farming<br/>by exponential growth',
    photoUrl: '/upgrades/fuel.jpg',
  },
  {
    title: 'Rocket Level',
    description: 'Expand your ability to<br/>farm by each tap',
    photoUrl: '/upgrades/launch.jpg',
  },
  {
    title: 'Farming Bot',
    description: 'Buy and increase an<br/>amount earned passively',
    photoUrl: '/upgrades/farm.jpg',
  },
];

export const BOOST_CARDS: Card[] = [
  {
    title: 'Fuel boost',
    description: 'Buy and Get unlimited<br/>amount of fuel to earn',
    photoUrl: '/upgrades/fuel-boost.jpg',
  },
  {
    title: 'Rocket boost',
    description: 'Purchase and enjoy x10<br/>earnings of the rockets',
    photoUrl: '/upgrades/launch-boost.jpg',
  },
];
