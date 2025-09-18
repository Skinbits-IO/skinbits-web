import { StepBackground } from './step-background';

export const Steps = () => {
  const texts = [
    {
      title: 'Share your invitation link',
      description: 'Invite your friends to enjoy playing the Skinbits Mini App',
    },
    {
      title: 'Get coins for each friend',
      description:
        'Receive the 10,00 / 50,000 (gold)/ 100,000(premium) after inviting mates',
    },
    {
      title: 'Earn passive income',
      description:
        'Opportunity to earn passively while your friends are tapping',
    },
  ];

  return (
    <div className="relative mt-10 w-full flex flex-col items-center justify-center gap-[60px] px-[30px]">
      {texts.map((value, index) => (
        <div
          key={index}
          className={`w-full flex flex-col justify-center z-[1] ${
            index % 2 === 0 ? 'items-end' : 'items-start'
          }`}
        >
          <div className="max-w-[250px] flex flex-col items-start justify-center gap-10px">
            <h3 className="text-white text-[16px] font-bold">{value.title}</h3>
            <p className="text-white text-[12px] font-medium opacity-40">
              {value.description}
            </p>
          </div>
        </div>
      ))}
      <StepBackground className="absolute top-[75px] left-1/2 -translate-x-1/2 z-0" />
    </div>
  );
};
