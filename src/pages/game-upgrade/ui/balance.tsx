import { RocketIcon } from '../../../shared';

interface IBalanceProps {
  balance: number;
}

export const Balance = ({ balance }: IBalanceProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div className="w-full flex flex-col justify-center items-start gap-[10px]">
      <p className="text-[12px] font-medium text-white opacity-70">Balance</p>
      <div className="flex justify-center items-center gap-[10px]">
        <RocketIcon size={30} color="#FFFFFF" />
        <h3 className="text-[32px] font-normal font-['Bebas_Neue'] text-white leading-none">
          {formattedBalance}
        </h3>
      </div>
    </div>
  );
};
