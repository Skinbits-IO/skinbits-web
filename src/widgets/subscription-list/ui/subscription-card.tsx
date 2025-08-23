import {
  CheckIcon,
  PREMIUM_PLANS,
  StarIcon,
  TonIcon,
  useUser,
} from '../../../shared';

interface ISubscriptionCardProps {
  option: 'free' | 'gold' | 'premium';
  setItem: (
    item: {
      option: 'gold' | 'premium';
      price: {
        ton: number;
        star: number;
      };
    } | null
  ) => void;
  onOpenPopup: () => void;
}

export const SubscriptionCard = ({
  option,
  setItem,
  onOpenPopup,
}: ISubscriptionCardProps) => {
  let plans, backgroundColor, color, title, description;

  switch (option) {
    case 'free':
      plans = PREMIUM_PLANS.free;
      backgroundColor = '#000000';
      color = 'rgba(255, 255, 255, 0.8)';
      title = 'Free';
      description = 'For beginner users:';
      break;
    case 'gold':
      plans = PREMIUM_PLANS.gold;
      backgroundColor = '#EBCA77FF';
      color = '#000000';
      title = 'Gold';
      description = 'For experienced users:';
      break;
    case 'premium':
      plans = PREMIUM_PLANS.premium;
      backgroundColor = '#89C6D4FF';
      color = '#000000';
      title = 'Premium';
      description = 'For advanced users:';
      break;
  }

  const { subscription } = useUser();

  const activeBought = subscription && subscription.subscriptionType === option;
  const activeFree = !activeBought && option === 'free';

  return (
    <div
      className="flex flex-col items-start justify-start gap-5 w-[15.625rem] p-5 rounded-lg border border-white/10 shrink-0"
      style={{ backgroundColor }}
    >
      {/* Text Section */}
      <div className="flex flex-col items-start justify-center gap-1.5 w-full">
        <h5
          className="text-xl font-semibold"
          style={{ color: option === 'free' ? '#FFFFFF' : color }}
        >
          {title}
        </h5>

        <div className="flex items-end justify-center gap-2.5">
          <span className="flex items-center gap-1 leading-0">
            <TonIcon color={option === 'free' ? '#FFFFFF' : color} size={22} />
            <h3
              className="text-[27px] font-bold"
              style={{ color: option === 'free' ? '#FFFFFF' : color }}
            >
              {plans.price.ton}
            </h3>
          </span>

          <span className="flex items-center gap-1 mb-0.5 leading-0">
            <StarIcon color={color} size={18} />
            <h3 className="text-[14px] font-semibold" style={{ color }}>
              {plans.price.star}
            </h3>
          </span>
        </div>

        <p className="text-[11px] font-medium" style={{ color }}>
          per user/month, billed monthly
        </p>
      </div>

      {/* Benefits */}
      <div className="flex flex-col items-start justify-center gap-2.5 leading-0">
        <span className="text-xs font-medium" style={{ color }}>
          {description}
        </span>
        {plans.bonuses.map((value, index) => (
          <div
            key={index}
            className="flex items-center justify-center gap-[10px]"
          >
            <CheckIcon
              size={18}
              bgColor={option === 'free' ? 'rgba(255, 255, 255, 0.4)' : color}
            />
            <span className="text-[12px] font-normal" style={{ color }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <button
        disabled={(activeFree || activeBought) ?? false}
        onClick={() => {
          setItem({
            option: option as 'gold' | 'premium',
            price: {
              ton: plans.price.ton,
              star: plans.price.star,
            },
          });
          onOpenPopup();
        }}
        className="w-full h-[33px] rounded-full text-[14px] font-medium flex items-center justify-center border-none"
        style={{
          color: option === 'free' ? '#000000' : '#FFFFFF',
          backgroundColor: option === 'free' ? '#FFFFFF' : '#000000',
        }}
      >
        {activeFree || (activeBought && subscription?.isActive)
          ? 'Current plan'
          : activeBought && !subscription?.isActive
          ? 'Pending'
          : 'Get started'}
      </button>
    </div>
  );
};
