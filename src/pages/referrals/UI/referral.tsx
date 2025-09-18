import { RocketIcon } from '../../../shared';

interface IReferralProps {
  username: string | null;
  photoUrl: string | null;
  earning: number;
}

export const Referral = ({ username, photoUrl, earning }: IReferralProps) => {
  const url = photoUrl ?? `${window.location.origin}/avatar.jpg`;
  const formatedEarning = new Intl.NumberFormat('en-US').format(earning);

  return (
    <div className="grid grid-cols-[1fr_auto] gap-[15px] w-full rounded-[12px] px-[15px] py-[12px]">
      <div className="flex items-center min-w-0">
        <img
          className="!h-[39px] !w-[39px] rounded-full border border-white/10"
          src={url}
          alt="avatar"
        />
        <h6 className="ml-[10px] text-sm font-medium text-[#8E8E8E] truncate min-w-0 flex-1">
          {username ?? ''}
        </h6>
      </div>

      <div className="min-w-fit flex items-center gap-[5px]">
        <RocketIcon size={19} color="#D2F7B6" />
        <p className="text-[20px] font-normal font-['Bebas_Neue'] text-[#D2F7B6] leading-none">
          +{formatedEarning}
        </p>
      </div>
    </div>
  );
};
