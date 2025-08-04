import styles from './SkinInfo.module.css';
import { SkinImage } from '../../../../components';
import { RARITIES_COLOR_MAP, Skin } from '../../../../shared';

interface ISkinInfoProps {
  skin: Skin;
}

export const SkinInfo = ({ skin }: ISkinInfoProps) => {
  const effectUrl = window.location.origin + '/skin-background.png';

  return (
    <div className={styles.background}>
      <SkinImage
        image={effectUrl}
        backgroundColor={RARITIES_COLOR_MAP[skin.rarity]}
      />
      <div className={styles.info}>
        <h5>{skin.title}</h5>
        <p>{skin.quality + ' / ' + skin.rarity}</p>
      </div>
    </div>
  );
};
