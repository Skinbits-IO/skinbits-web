import { useMemo } from 'react';
import { ExchangeIcon, RocketIcon } from '../../../../components';
import { RARITIES_COLOR_MAP } from '../../../../shared';
import { Skin } from '../../types';
import styles from './SkinCard.module.css';

interface ISkinCardProps {
  skin: Skin;
}

export const SkinCard = ({ skin }: ISkinCardProps) => {
  const effectUrl =
    window.location.origin + '/skinbits-web/skin-background.png';
  const rarityColor = RARITIES_COLOR_MAP[skin.rarity];
  const formattedPrice = new Intl.NumberFormat('en-US').format(skin.price);

  return (
    <div className={styles.background}>
      <div className={styles.skinImageContainer}>
        <img
          className={styles.skin}
          src={window.location.origin + '/skinbits-web/skin-placeholder.png'}
          alt="image"
        />
        <img className={styles.effect} src={effectUrl} alt="image" />
        {useMemo(
          () => (
            <div
              className={styles.light}
              style={{ backgroundColor: rarityColor }}
            />
          ),
          []
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h5>{skin.title}</h5>
          <p>{skin.quality}</p>
        </div>
        <div className={styles.prices}>
          <div className={styles.rocketPrice}>
            <RocketIcon color="#92D0A7" />
            <p>{formattedPrice}</p>
          </div>
          <div className={styles.euroPrice}>
            <ExchangeIcon size={12} color="#7F7F7F" opacity={1} />
            <p>{'€ ' + skin.priceEuro}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
