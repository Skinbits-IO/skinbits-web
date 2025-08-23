import { CloseIcon } from '../../..';

interface IPopupCloseButtonInterface {
  onTap: () => void;
}

export const CloseButton = ({ onTap }: IPopupCloseButtonInterface) => {
  return (
    <button
      onClick={onTap}
      className="relative w-fit h-fit p-0 bg-none border-none"
    >
      <CloseIcon size={22} />
    </button>
  );
};
