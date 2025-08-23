import { SubmitHandler, useForm } from 'react-hook-form';
import WebApp from '@twa-dev/sdk';
import { Popup, PopupButton, YOUTUBE_URL } from '../../../shared';
import { useSaveTradeLink } from '../../../entities';

interface ISteamPopupProps {
  onClose: () => void;
}

interface FormValues {
  tradeLink: string;
}

const steamTradeLinkRegex =
  /^https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=\d+&token=[A-Za-z0-9]+$/;

function isValidSteamTradeLink(link: string): boolean {
  return steamTradeLinkRegex.test(link);
}

export const SteamPopup = ({ onClose }: ISteamPopupProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { mutate } = useSaveTradeLink(onClose);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data.tradeLink);
  };

  return (
    <Popup onClose={onClose}>
      <div className="h-24 w-full rounded-2xl bg-[url('/steam-background.png')] bg-cover bg-center bg-no-repeat" />

      <div className="w-full p-5 rounded-xl border border-dashed border-white/10 flex flex-col items-start gap-[0.9375rem] text-[0.875rem] font-normal text-[#7C7C7C] break-words overflow-wrap break-word whitespace-normal">
        <h5 className="text-white text-base font-semibold">
          Paste steam trade link
        </h5>
        <p className="text-[#A0A0A0] text-sm font-medium">
          {`Go to you Steam profile -> Inventory -> Trade Offers -> Who can send me Trade Offers -> Third-Party Sites (Copy link)`}
        </p>
        <button
          onClick={() => WebApp.openLink(YOUTUBE_URL)}
          className="h-[2.9375rem] w-full px-2.5 py-[0.9375rem] rounded-md bg-[#C3AFAF] text-sm font-medium text-black flex justify-center items-center"
        >
          YouTube Tutorial
        </button>
      </div>

      <form
        className="w-full flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          id="tradeLink"
          type="text"
          placeholder="Your Steam trade link"
          className={`w-full px-[1.0625rem] py-[1.3125rem] rounded-md border bg-[rgba(217,217,217,0.02)] text-[#C5C5C5] font-medium text-base transition-colors duration-200 focus:outline-none ${
            errors.tradeLink
              ? 'border-[#ff6b6b]'
              : 'border-white/10 focus:border-white/50'
          }`}
          {...register('tradeLink', {
            required: 'Trade link is required',
            validate: (val) =>
              isValidSteamTradeLink(val) ||
              'Must be a Steam trade URL like https://steamcommunity.com/tradeoffer/new/?partner=123456&token=ABCDEFGH',
          })}
        />

        {errors.tradeLink && (
          <p className="-mt-7 ml-2 text-[#ff6b6b] text-xs leading-normal">
            {errors.tradeLink.message}
          </p>
        )}

        <PopupButton text="Save" isRequestPending={isSubmitting} />
      </form>
    </Popup>
  );
};
