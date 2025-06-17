import { useState } from 'react';
import styles from './MarketplacePage.module.css';
import { Filter, Header, SkinCard } from './UI';
import { Skin } from './types';
import { Qualities, Rarities } from '../../shared';

export const MarketplacePage = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const skins: Skin[] = [
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000000000000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
      imageUrl: './skin-placeholder.png',
    },
    {
      title: 'Sport Gloves',
      description: '',
      rarity: Rarities.ExceedinglyRare,
      quality: Qualities.FactoryNew,
      price: 12000000,
      priceEuro: 1000,
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
          return <SkinCard key={key} skin={skin} />;
        })}
      </div>
    </div>
  );
};
