import {
  RARITIES_COLOR_MAP,
  RocketIcon,
  Skin,
  SkinImage,
} from '../../../../shared';
import styles from './SkinCard.module.css';

interface ISkinCardProps {
  skin: Skin;
  onClick: () => void;
}

export const SkinCard = ({ skin, onClick }: ISkinCardProps) => {
  const effectUrl = window.location.origin + '/skin-background.png';
  const formattedPrice = new Intl.NumberFormat('en-US').format(skin.price);

  return (
    <div className={styles.background} onClick={onClick}>
      <SkinImage
        image={effectUrl}
        backgroundColor={RARITIES_COLOR_MAP[skin.rarity]}
      />
      <div className={styles.content}>
        <div className={styles.description}>
          <h5>{skin.title}</h5>
          <p>{skin.quality}</p>
        </div>
        <div className={styles.rocketPrice}>
          <RocketIcon color="#92D0A7" />
          <p>{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
};
