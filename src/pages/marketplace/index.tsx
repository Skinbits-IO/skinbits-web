import styles from './MarketplacePage.module.css';
import { SkinCard } from './ui';
import { Qualities, Rarities, Skin } from '../../shared';
import { useNavigate } from 'react-router';
import { Search } from '../../widgets';

export const MarketplacePage = () => {
  const navigate = useNavigate();

  const skins: Skin[] = [
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: 'fjipgjipjgpowropggpmfopjm3pgip3gipj3pigj3jg3jogj3ogj3joio',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      imageUrl: './skin-placeholder.png',
    },
  ];

  return (
    <div className={styles.background}>
      <Search />
      <div className={styles.skinList}>
        {skins.map((skin, key) => {
          return (
            <div key={key} className={styles.card}>
              <SkinCard
                skin={skin}
                onClick={() =>
                  navigate('/marketplace/skin-page', { state: { skin } })
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
