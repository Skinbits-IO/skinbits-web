import styles from './CustomPopup.module.css';
import { Card } from '../../types';
import {
  Description,
  Popup,
  PopupButton,
  RocketIcon,
  useUser,
} from '../../../../shared';
import { useEffect, useState } from 'react';

interface ICustomPopupProps {
  card: Card & { price: number; amount?: number };
  onActivate?: () => void;
  onUpgrade: () => void;
  isRequestPending?: boolean;
  onExit: () => void;
}

export const CustomPopup = ({
  card,
  onActivate,
  onUpgrade,
  isRequestPending,
  onExit,
}: ICustomPopupProps) => {
  const { user } = useUser();

  const [activateLoading, setActivateLoading] = useState(false);
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const isBoost = card.amount !== undefined;

  useEffect(() => {
    if (!isRequestPending) setActivateLoading(false);
  }, [isRequestPending]);

  return (
    <Popup onClose={onExit}>
      <div className={styles.imageContainer}>
        <img
          src={window.location.origin + card.photoUrl}
          className={styles.image}
          alt={card.title}
        />
        <div className={styles.title}>{card.title}</div>
      </div>
      <Description text={card.description} />
      <div className={styles.priceContainer}>
        <RocketIcon size={19} color="#D2F7B6" />
        <p className={styles.price}>{formatedPrice}</p>
      </div>
      <div
        className={styles.buttonContainer}
        style={{ gridTemplateColumns: isBoost ? '1fr 1fr' : '1fr' }}
      >
        {isBoost && onActivate && (
          <PopupButton
            disabled={card.amount === 0}
            text={`Activate (${card.amount})`}
            isRequestPending={activateLoading}
            onClick={() => {
              setActivateLoading(true);
              onActivate();
            }}
          />
        )}
        <PopupButton
          disabled={user!.balance < card.price}
          text={isBoost ? 'Buy' : 'Upgrade'}
          isRequestPending={isRequestPending && !activateLoading}
          onClick={() => onUpgrade()}
        />
      </div>
    </Popup>
  );
};
