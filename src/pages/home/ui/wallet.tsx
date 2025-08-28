import { RocketIcon } from '../../../shared';

interface IWalletProps {
  balance: number;
}

export const Wallet = ({ balance }: IWalletProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div
      className="relative h-[4.75rem] w-full p-[0.9375rem] rounded-xl border border-white/10 flex flex-col justify-between items-start overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/wallet-background.png')" }}
    >
      <h6 className="text-[0.75rem] font-medium text-white opacity-70">
        Balance
      </h6>
      <div className="flex items-center justify-center gap-[0.0938rem]">
        <RocketIcon size={24} color="#FFFFFF" />
        <h5
          className="text-[24px] font-normal text-white"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          {formattedBalance}
        </h5>
      </div>
    </div>
  );
};
