import { RocketIcon } from '../../../../shared';
import { WalletButton } from './wallet-button';

interface IWalletProps {
  balance: number;
}

export const Wallet = ({ balance }: IWalletProps) => {
  const formattedBalance = new Intl.NumberFormat('en-US').format(balance);

  return (
    <div className="relative w-full px-5 pt-6 pb-5 border border-white/10 rounded-[1.375rem] bg-[url('/account-wallet-background.png')] bg-cover bg-center bg-no-repeat flex flex-col items-start justify-start gap-5 overflow-hidden">
      <div className="flex flex-col items-start justify-center gap-2.5">
        <h6 className="text-xs font-medium text-white/70">Balance</h6>
        <div className="flex items-center justify-center gap-1.5">
          <RocketIcon size={24} color="#FFFFFF" />
          <h5
            className="text-white text-3xl font-normal leading-0"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {formattedBalance}
          </h5>
        </div>
        <div className="flex items-center justify-center gap-[0.4375rem]">
          <WalletButton text="Receive" disabled={true} onClick={() => {}} />
          <WalletButton text="Send" disabled={true} onClick={() => {}} />
          <WalletButton text="Convert" disabled={true} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
