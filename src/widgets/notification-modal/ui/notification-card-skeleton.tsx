export const NotificationCardSkeleton = () => {
  return (
    <div className="h-fit w-full bg-white/5 px-4 py-[14px] rounded-[14px] flex flex-col justify-center items-start gap-2 animate-pulse">
      {/* Application row */}
      <div className="flex items-center justify-start gap-1.5 w-full">
        <div className="size-3 rounded-full bg-white/10" />
        <div className="h-3 w-12 rounded bg-white/10" />
        <div className="h-3 w-16 rounded bg-white/10" />
      </div>

      {/* Title */}
      <div className="h-4 w-3/5 rounded bg-white/10" />

      {/* Description (2–3 lines) */}
      <div className="h-3 w-full rounded bg-white/10" />
      <div className="h-3 w-11/12 rounded bg-white/10" />
      <div className="h-3 w-4/5 rounded bg-white/10" />

      {/* Optional Image placeholder */}
      <div className="w-full aspect-square rounded-lg bg-white/10" />
    </div>
  );
};
