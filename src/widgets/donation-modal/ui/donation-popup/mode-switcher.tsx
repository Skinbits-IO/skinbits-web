import React from 'react';
import { StarIcon, TonIcon } from '../../../../shared';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const ModeSwitcher: React.FC<{
  mode: 'ton' | 'star';
  onChange: (mode: 'ton' | 'star') => void;
}> = ({ mode, onChange }) => {
  const [tonConnectUI] = useTonConnectUI();
  const baseBtn =
    'flex-1 py-[15px] flex items-center justify-center gap-2 font-semibold text-base transition-colors disabled:opacity-50';

  return (
    <div className="flex w-full rounded-[9px] overflow-hidden">
      <button
        disabled={!tonConnectUI.connected}
        className={`${baseBtn} ${
          mode === 'ton' ? 'bg-white text-black' : 'bg-white/5 text-white/70'
        }`}
        onClick={() => onChange('ton')}
      >
        <span>TON</span>
        <TonIcon
          color={mode === 'ton' ? '#000000' : 'rgba(255, 255, 255, 0.7)'}
        />
      </button>

      <button
        className={`${baseBtn} ${
          mode === 'star' ? 'bg-white text-black' : 'bg-white/5 text-white/70'
        }`}
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
