interface IWalletButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
}

export const WalletButton = ({
  text,
  disabled,
  onClick,
}: IWalletButtonProps) => {
  return (
    <button
      className="px-3 py-2 rounded-[28px] bg-white/5 text-sm text-[#CDCDCD] font-medium border-none disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
