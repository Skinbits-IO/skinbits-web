import { Qualities, Rarities } from '../../../shared';

export type Skin = {
  title: string;
  description: string;
  rarity: Rarities;
  quality: Qualities;
  price: number;
  priceEuro: number;
  imageUrl: string;
};
