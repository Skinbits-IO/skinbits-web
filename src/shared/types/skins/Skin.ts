import { Qualities } from './Qualities';
import { Rarities } from './Rarities';

export type Skin = {
  title: string;
  description: string;
  rarity: Rarities;
  quality: Qualities;
  price: number;
  imageUrl: string;
};
