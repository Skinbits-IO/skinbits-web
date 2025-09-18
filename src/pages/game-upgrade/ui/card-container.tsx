interface ICardContainer {
  title: string;
  content: React.ReactNode[];
}

export const CardContainer = ({ title, content }: ICardContainer) => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-5">
      <h5 className="text-[14px] font-medium text-[#C2C2C2]">{title}</h5>

      <div className="h-fit w-full flex flex-col justify-center items-center gap-[10px] p-[15px] rounded-[12px] border border-white/5 bg-[rgba(217,217,217,0.03)]">
        {content.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col justify-center items-center gap-[10px]"
          >
            {index !== 0 && (
              <div className="h-px w-full bg-[rgba(217,217,217,0.05)]" />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
