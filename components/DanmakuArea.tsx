'use client';

interface DanmakuAreaProps {
  className?: string;
}

export default function DanmakuArea({ className = "" }: DanmakuAreaProps) {
  return (
    <div className={`absolute w-full h-full select-none ${className}`}>
      <div className="relative bg-primary/[0.03] backdrop-blur-[4px] w-full h-full">
        <div className="absolute top-0 left-0 h-[20%] w-[20%] border-[4px] border-primary/80 border-r-0 border-b-0" />
        <div className="absolute top-0 right-0 h-[20%] w-[20%] border-[4px] border-primary/80 border-l-0 border-b-0" />
        <div className="absolute bottom-0 right-0 h-[20%] w-[20%] border-[4px] border-primary/80 border-l-0 border-t-0" />
        <div className="absolute bottom-0 left-0 h-[20%] w-[20%] border-[4px] border-primary/80 border-r-0 border-t-0" />
      </div>
      <h1 className="text-white bg-primary w-fit font-outfit px-[0.25em] my-2 m-0 text-[14px]">
        CHAT LOG
      </h1>
    </div>
  );
}
