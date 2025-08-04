import React from 'react';
import styles from './ModeSwitcher.module.css';
import { StarIcon, TonIcon } from '../../../../../../components';

export const ModeSwitcher: React.FC<{
  mode: 'ton' | 'star';
  onChange: (mode: 'ton' | 'star') => void;
}> = ({ mode, onChange }) => {
  return (
    <div className={styles.switcher}>
      <button
        className={mode === 'ton' ? styles.active : styles.inactive}
        onClick={() => onChange('ton')}
      >
        <span>TON</span>
        <TonIcon
          color={mode === 'ton' ? '#000000' : 'rgba(255, 255, 255, 0.7)'}
        />
      </button>
      <button
        className={mode === 'star' ? styles.active : styles.inactive}
        onClick={() => onChange('star')}
      >
        <span>Telegram</span>
        <StarIcon
          color={mode === 'star' ? '#000000' : 'rgba(255, 255, 255, 0.7)'}
        />
      </button>
    </div>
  );
};
