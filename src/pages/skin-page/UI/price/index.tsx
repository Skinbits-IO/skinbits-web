import { RocketIcon } from '../../../../shared';
import styles from './Price.module.css';

interface IPriceProps {
  price: number;
}

export const Price = ({ price }: IPriceProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className={styles.background}>
      <RocketIcon color="#92D0A7" size={22} />
      <p>{formattedPrice}</p>
    </div>
  );
};
