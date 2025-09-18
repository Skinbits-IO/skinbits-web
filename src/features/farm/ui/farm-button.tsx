import { useNavigate } from 'react-router';
import { RocketIcon, useAppSelector, useUser } from '../../../shared';
import { useEffect, useState } from 'react';
import { formatTimeRemaining, toIsoUtcNoMs } from '../utils';
import {
  FarmStatus,
  useClaimFarm,
  useFarmStatus,
  useStartFarm,
} from '../../../entities';
import { FarmButtonSkeleton } from './farm-button-skeleton';

interface IFarmButtonProps {
  openPopup: () => void;
}

export const FarmButton = ({ openPopup }: IFarmButtonProps) => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { status, session } = useAppSelector((state) => state.farm);
  const { isPending } = useFarmStatus();

  const { mutate: startFarmMutation, isPending: isPendingStart } =
    useStartFarm();
  const { mutate: claimFarmMutation, isPending: isPendingClaim } =
    useClaimFarm();

  const isFarmingAvailable = user?.farmLevel !== 0;
  const progress = 100 * (user!.balance / 250000);
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (session) {
      const update = () => {
        setTimeLeft(formatTimeRemaining(session.endTime));
      };
      update();
      timer = setInterval(update, 60_000);
    }
    return () => clearInterval(timer);
  }, [session]);

  const getButtonText = (): string => {
    switch (status) {
      case FarmStatus.Inactive:
        return 'Start farming for 6h';
      case FarmStatus.Active:
        return `Farming ends in ${timeLeft}`;
      case FarmStatus.Claim:
        return 'Claim farmed rockets';
      case FarmStatus.Buy:
      default:
        return 'Buy farm for 250 000';
    }
  };

  return isPending ? (
    <FarmButtonSkeleton />
  ) : (
    <div
      className={`relative h-[3.4375rem] w-full flex justify-between items-center rounded-[0.875rem] cursor-pointer`}
      style={
        isFarmingAvailable
          ? {
              background:
                'linear-gradient(90deg, #E2C1F9 0%, #FEBD8E 33%, #FBFFE4 66%, #B6D0F7 100%)',
            }
          : { backgroundColor: 'rgba(255, 255, 255, 0.03)' }
      }
      onClick={() => {
        if (status === FarmStatus.Active) {
          openPopup();
        } else if (status === FarmStatus.Inactive) {
          startFarmMutation({
            startTime: toIsoUtcNoMs(),
          });
        } else if (status === FarmStatus.Buy) {
          navigate('/upgrade');
        } else if (status === FarmStatus.Claim) {
          claimFarmMutation();
        }
      }}
    >
      {status === FarmStatus.Buy && (
        <div
          className="absolute h-full bg-[rgba(217,217,217,0.02)] rounded-[0.875rem] z-0"
          style={{ width: `${progress}%` }}
        />
      )}
      <div className="w-full px-[0.9375rem] py-[0.625rem] bg-transparent flex justify-center items-center z-10">
        {isPendingStart || isPendingClaim ? (
          <span className="w-5 h-5 border-[3px] border-black border-t-[rgba(0,0,0,0.25)] rounded-full animate-spin" />
        ) : (
          <div className="w-full flex justify-between items-center">
            <p
              className={
                isFarmingAvailable
                  ? 'text-sm font-semibold text-black'
                  : 'text-sm font-medium text-[#B1B1B1]'
              }
            >
              {getButtonText()}
            </p>
            <div className="flex justify-center items-center gap-[0.625rem]">
              {(status === FarmStatus.Claim ||
                status === FarmStatus.Active) && (
                <p className="text-sm font-extrabold text-black">
                  {session?.amountFarmed}
                </p>
              )}
              <div
                className="h-[2.3125rem] w-[2.3125rem] rounded-[1.1563rem] flex justify-center items-center"
                style={
                  isFarmingAvailable
                    ? { backgroundColor: '#000000' }
                    : {
                        background:
                          'linear-gradient(90deg, #E2C1F9 0%, #FEBD8E 33%, #FBFFE4 66%, #B6D0F7 100%)',
                      }
                }
              >
                <RocketIcon
                  size={20}
                  color={isFarmingAvailable ? '#FFFFFF' : '#000000'}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
