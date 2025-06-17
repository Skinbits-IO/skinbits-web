import { Rarities } from '../types';

export const RARITIES_COLOR_MAP: Record<Rarities, string> = {
  [Rarities.ConsumerGrade]: '#D2D2D2', // almost white
  [Rarities.IndustrialGrade]: '#73C8FF', // light blue
  [Rarities.MilSpecGrade]: '#4B69FF', // blue
  [Rarities.Restricted]: '#8847FF', // purple
  [Rarities.Classified]: '#D32EEE', // pink
  [Rarities.Covert]: '#EB4B4B', // red
  [Rarities.ExceedinglyRare]: '#FFF468', // gold
  [Rarities.Contraband]: '#FB0404', // bright red
};
