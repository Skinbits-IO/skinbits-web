import { useQuery } from '@tanstack/react-query';
import { getReferrals } from '../api';
import { StandardButton, useUser } from '../../../shared';
import { useReferralLink } from '../hooks';
import { Steps } from './steps';
import { Referral } from './referral';

export const ReferralsPage = () => {
  const { mutate: generateLink } = useReferralLink();
  const { user } = useUser();

  const { data: referrals, isPending } = useQuery({
    queryKey: ['referrals'],
    queryFn: () => getReferrals(user!.telegramId),
    retry: 0,
    staleTime: Infinity,
  });

  return (
    <div className="relative flex h-full w-[calc(100%-1.875rem)] flex-col items-center justify-start overflow-hidden bg-transparent m-[0.9375rem]">
      <img
        className="fixed top-[-30px] left-0 h-[350px] w-[412px] -z-10"
        src={`${window.location.origin}/referrals.png`}
        alt="referral illustration"
      />
      <div className="fixed top-[190px] h-[100px] w-full bg-black blur-[15px] -z-10" />
      <div className="relative h-full min-w-full flex-1 grid grid-rows-[1fr_56px] gap-[10px] px-[10px] pt-[130px] pb-[100px] overflow-x-hidden overflow-y-auto">
        <div className="flex h-full min-w-full flex-1 flex-col items-center justify-start gap-[40px]">
          <h1 className="text-white text-[24px] font-extrabold text-center uppercase">
            Invite friends <br /> Earn points
          </h1>

          {isPending ? (
            <div className="flex flex-1 w-full justify-center items-center">
              <span className="w-[20px] h-[20px] border-[3px] border-white border-t-transparent rounded-full animate-spin" />
            </div>
          ) : referrals && referrals.length > 0 ? (
            <div className="flex w-full flex-col items-start justify-start gap-[15px]">
              <h6 className="text-white text-[14px] font-semibold opacity-70">
                You referrals:
              </h6>
              <div className="flex w-full justify-center items-center gap-[10px] flex-wrap">
                {referrals.map((value, index) => {
                  return (
                    <Referral
                      key={index}
                      username={value.referredUser.username}
                      photoUrl={value.referredUser.photoUrl}
                      earning={value.totalCommissionAwarded}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <Steps />
          )}
        </div>

        <StandardButton text="Invite fren" onClick={() => generateLink()} />
      </div>
    </div>
  );
};
