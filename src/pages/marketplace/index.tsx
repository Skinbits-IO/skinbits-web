import { useState } from 'react';
import styles from './MarketplacePage.module.css';
import { Filter, Header, SkinCard } from './UI';
import { Qualities, Rarities, Skin } from '../../shared';
import { useNavigate } from 'react-router';

export const MarketplacePage = () => {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);

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
      <Header
        filterActive={openFilter}
        onFilterTap={() => setOpenFilter(!openFilter)}
      />
      {openFilter && <Filter />}
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
