import { CloseIcon } from '../../../..';
import styles from './PopupCloseButton.module.css';

interface IPopupCloseButtonInterface {
  onTap: () => void;
}

export const CloseButton = ({ onTap }: IPopupCloseButtonInterface) => {
  return (
    <button className={styles.button} onClick={() => onTap()}>
      <CloseIcon size={22} />
    </button>
  );
};
