interface IPopupButton {
  text: string;
  isRequestPending?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export const PopupButton = ({
  text,
  isRequestPending = false,
  disabled = false,
  onClick,
}: IPopupButton) => {
  return (
    <button
      onClick={onClick}
      disabled={isRequestPending || disabled}
      className="h-[50px] w-full flex justify-center items-center px-[15px] py-[13px] rounded-full bg-white disabled:opacity-70"
    >
      {isRequestPending ? (
        <span className="w-5 h-5 border-[3px] border-black border-t-[3px] border-t-black/25 rounded-full animate-[spin_0.8s_linear_infinite]" />
      ) : (
        <span className="text-sm font-semibold text-black">{text}</span>
      )}
    </button>
  );
};
