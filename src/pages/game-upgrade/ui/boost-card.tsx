import { ArrowIcon } from './arrow-icon';

interface IBoostCardProps {
  title: string;
  photoUrl: string;
  price: number;
  amount: number;
  disabled?: boolean;
  onClick: () => void;
}

export const BoostCard = ({
  title,
  photoUrl,
  price,
  amount,
  disabled = false,
  onClick,
}: IBoostCardProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="h-fit w-full flex justify-between items-center">
      {/* Left side */}
      <div className="flex justify-center items-center gap-[0.9375rem]">
        <img
          src={window.location.origin + photoUrl}
          className="!h-[3.625rem] !w-[3.625rem] rounded-[0.875rem]"
        />
        <div className="h-fit w-fit flex flex-col justify-center items-start gap-[0.3125rem]">
          <p className="text-[0.875rem] font-semibold text-[#8C8C8C]">
            {title}
          </p>
          <p className="text-[1rem] font-normal font-['Bebas_Neue'] text-white leading-none">
            {formattedPrice}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex justify-center items-center gap-[0.9375rem]">
        <div className="h-[1.75rem] w-[1.75rem] rounded-full flex justify-center items-center text-[0.625rem] font-semibold text-white bg-black border-[0.0938rem] border-[rgba(217,217,217,0.1)]">
          {amount}
        </div>
        <button
          className="h-[2.1875rem] w-[2.1875rem] flex justify-center items-center bg-white/5 border border-white/5 rounded-[0.5625rem] disabled:opacity-50"
          onClick={() => onClick()}
          disabled={disabled}
        >
          <ArrowIcon size={14} />
        </button>
      </div>
    </div>
  );
};
