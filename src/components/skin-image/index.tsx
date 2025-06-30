import { useMemo } from 'react';
import styles from './SkinImage.module.css';

interface ISkinImageProps {
  image: string;
  backgroundColor: string;
}

export const SkinImage = ({ image, backgroundColor }: ISkinImageProps) => {
  return (
    <div className={styles.background}>
      <img
        className={styles.skin}
        src={window.location.origin + '/skinbits-web/skin-placeholder.png'}
        alt="Skin image"
      />
      <img className={styles.effect} src={image} alt="image" />
      {useMemo(
        () => (
          <div
            className={styles.light}
            style={{ backgroundColor: backgroundColor }}
          />
        ),
        []
      )}
    </div>
  );
};
