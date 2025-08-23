import { RocketIcon, StarIcon, TonIcon } from '../../../../shared';

interface ICardProps {
  mode: 'ton' | 'star';
  rockets: number;
  price: number;
  onClick: () => void;
}

export const Card = ({ mode, rockets, price, onClick }: ICardProps) => {
  const formattedRockets = new Intl.NumberFormat('en-US').format(rockets);
  const formattedPrice = new Intl.NumberFormat('en-UK').format(price);

  return (
    <div
      onClick={onClick}
      className="w-full h-[60px] p-[15px] rounded-xl bg-white flex items-center justify-between"
    >
      <div className="flex items-center gap-[5px]">
        <RocketIcon size={20} color="#000000" />
        <p className="text-[15px] font-semibold text-black">
          Buy - {formattedRockets}
        </p>
      </div>

      <div className="px-[12px] py-[7px] rounded-full bg-black flex items-center gap-[5px] text-[14px] font-semibold text-white">
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
