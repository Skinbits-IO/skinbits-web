export const FarmButtonSkeleton = () => (
  <div className="relative h-16 rounded-[12px] bg-[#2a2a2a] overflow-hidden animate-pulse-slow">
    <div className="h-1 w-0 bg-[#444]" />
    <div className="flex items-center justify-between px-4 h-full">
      <div className="h-4 w-[60%] bg-[#444] rounded-[8px]" />
      <div className="flex items-center gap-2">
        <div className="w-10 h-4 bg-[#444] rounded-[8px]" />
        <div className="w-8 h-8 bg-[#444] rounded-full" />
      </div>
    </div>
  </div>
);
