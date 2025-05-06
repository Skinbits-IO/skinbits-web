import styles from './BoostCard.module.css';
import { ArrowIcon } from '../../../../components';

interface IBoostCardProps {
  title: string;
  photoUrl: string;
  price: number;
  amount: number;
  onClick: () => void;
}

export const BoostCard = ({
  title,
  photoUrl,
  price,
  amount,
  onClick,
}: IBoostCardProps) => {
  const formatedPrice = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <img src={window.location.origin + photoUrl} className={styles.image} />
        <div className={styles.textContainer}>
          <p className={styles.title}>{title}</p>
          <p className={styles.price}>{formatedPrice}</p>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.amountText}>{amount}</div>
        <button className={styles.button} onClick={() => onClick()}>
          <ArrowIcon size={14} />
        </button>
      </div>
    </div>
  );
};
