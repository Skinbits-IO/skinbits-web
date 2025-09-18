import { useNavigate } from 'react-router';
import { LightingIcon } from './lighting-icon';

export const UpgradeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="absolute left-1/2 -translate-x-1/2 bottom-5 px-[0.9375rem] py-[0.6875rem] flex items-center justify-center gap-[0.3125rem] bg-[#FBFFE4] rounded-[2.875rem] border-none z-[1]"
      onClick={() => navigate('/upgrade')}
    >
      <h5 className="text-[1.125rem] font-['Bebas_Neue'] leading-[1.2] text-black m-0">
        Upgrade
      </h5>
      <LightingIcon className="align-middle" />
    </button>
  );
};
