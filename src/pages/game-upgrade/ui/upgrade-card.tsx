import { useUser } from '../../../shared';
import { ArrowIcon } from './arrow-icon';

interface IUpgradeCardProps {
  title: string;
  photoUrl: string;
  price: number;
  level: number;
  onClick: () => void;
}

export const UpgradeCard = ({
  title,
  photoUrl,
  price,
  level,
  onClick,
}: IUpgradeCardProps) => {
  const { subscription } = useUser();
  const formatedPrice = new Intl.NumberFormat('en-US').format(price);

  const maxLevel = subscription && subscription.isActive ? 20 : 15;
  const levelPercentage = level ? Math.min(level / maxLevel, 1) * 100 : 0;

  return (
    <div className="h-fit w-full flex justify-between items-center">
      {/* Left: image + text */}
      <div className="flex justify-center items-center gap-3.5">
        <img
          src={window.location.origin + photoUrl}
          className="!h-[3.625rem] !w-[3.625rem] rounded-[0.875rem]"
        />
        <div className="h-fit w-fit flex flex-col justify-center items-start gap-[0.3125rem]">
          <p className="text-[0.875rem] font-semibold text-[#8C8C8C]">
            {title}
          </p>
          <p className="text-[1rem] font-normal font-['Bebas_Neue'] text-white leading-none">
            {level === maxLevel ? 'Max' : formatedPrice}
          </p>
        </div>
      </div>

      {/* Right: level badge + button */}
      <div className="flex justify-center items-center gap-[0.9375rem]">
        {level !== 0 && (
          <div
            className="relative h-[1.75rem] w-[1.75rem] rounded-full flex justify-center items-center"
            style={{
              background: `conic-gradient(#D2F7B6 ${levelPercentage}%, rgba(217, 217, 217, 0.1) ${levelPercentage}% 100%)`,
            }}
          >
            <div className="h-[1.5625rem] w-[1.5625rem] rounded-full flex justify-center items-center text-[0.625rem] font-semibold text-white bg-black">
              {level}
            </div>
          </div>
        )}

        <button
          className="h-[2.1875rem] w-[2.1875rem] flex justify-center items-center bg-white/5 border border-white/5 rounded-[0.5625rem] disabled:opacity-50"
          disabled={level === maxLevel}
          onClick={onClick}
        >
          <ArrowIcon size={14} />
        </button>
      </div>
    </div>
  );
};
