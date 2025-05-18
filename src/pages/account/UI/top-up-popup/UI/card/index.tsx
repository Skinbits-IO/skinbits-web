import { RocketIcon, StarIcon, TonIcon } from '../../../../../../components';
import styles from './Card.module.css';

interface ICardProps {
  mode: 'ton' | 'star';
  rockets: number;
  price: number;
}

export const Card = ({ mode, rockets, price }: ICardProps) => {
  const formattedRockets = new Intl.NumberFormat('en-US').format(rockets);
  const formattedPrice = new Intl.NumberFormat('en-UK').format(price);

  return (
    <div className={styles.background}>
      <div className={styles.rockets}>
        <RocketIcon size={20} color="#000000" />
        <p>Buy - {formattedRockets}</p>
      </div>
      <div className={styles.price}>
        {formattedPrice}
        {mode === 'ton' ? (
          <TonIcon size={14} color="#FFFFFF" />
        ) : (
          <StarIcon size={14} color="#FFFFFF" />
        )}
      </div>
    </div>
  );
};
