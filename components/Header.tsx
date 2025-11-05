'use client';

import { useState, useEffect } from 'react';
import Clock from './Clock';
import LivestreamTimer from './LivestreamTimer';
import InfoBlock from './InfoBlock';
import { HeaderConfig } from '@/types/profile';

interface InfoBlockData {
  id: number;
  blockTitle: string;
  blockContent: string;
}

interface HeaderProps {
  config?: HeaderConfig;
  onSwitchLayout: () => void;
  onInfoBlocksUpdate?: (infoblocks: InfoBlockData[]) => void;
}

export default function Header({ config, onSwitchLayout, onInfoBlocksUpdate }: HeaderProps) {
  const [infoblocks, setInfoblocks] = useState<InfoBlockData[]>(
    config?.infoblocks || [
      { id: 1, blockTitle: "今日直播目标", blockContent: "活着下播" },
      { id: 2, blockTitle: "直播群", blockContent: "670415161" },
    ]
  );
  const [nextInfoBlockID, setNextInfoBlockID] = useState(
    Math.max(0, ...(config?.infoblocks.map(ib => ib.id) || [0]))
  );

  // Sync infoblocks to parent when they change
  useEffect(() => {
    if (onInfoBlocksUpdate) {
      onInfoBlocksUpdate(infoblocks);
    }
  }, [infoblocks, onInfoBlocksUpdate]);

  const addInfoBlock = (infoBlockData?: { blockTitle: string; blockContent: string } | null) => {
    setNextInfoBlockID((prevId) => {
      const newId = prevId + 1;
      setInfoblocks((prev) => [
        ...prev,
        {
          id: newId,
          blockTitle: infoBlockData?.blockTitle || "标题",
          blockContent: infoBlockData?.blockContent || "内容",
        },
      ]);
      return newId;
    });
  };

  const removeInfoBlock = (id: number) => {
    setInfoblocks((prev) => prev.filter((ib) => ib.id !== id));
  };

  return (
    <div className="flex-horizontal overflow-x-hidden">
      <div className="h-[51.05px] flex flex-row items-center justify-start px-[25.75px]">
        <div
          className="w-[51.05px] h-[51.05px] bg-primary mr-4 flex-shrink-0 cursor-pointer hover:brightness-110 transition-all"
          onClick={onSwitchLayout}
        />

        <div className="relative whitespace-nowrap select-none flex-shrink-0 font-source-han-serif text-[rgb(50,50,50)]">
          <h1 className="relative -top-[3px] text-[50px] font-thin z-[1] m-0">直播进行中</h1>
          <p
            className="absolute left-[80px] -bottom-[66px] font-abuget text-[70px] text-primary z-10 m-0"
            style={{ transform: 'rotate(-10deg)' }}
          >
            live streaming
          </p>
        </div>

        <LivestreamTimer className="ml-8 mr-4 items-end p-0 self-end h-full" />
        <Clock className="ml-2 items-end p-0 flex-shrink-0 self-end h-full" label="LOCAL TIME" />
        <Clock className="ml-2 items-end p-0 flex-shrink-0 self-end h-full" timezone="Asia/Shanghai" label="CN TIME" />

        <div className="flex-horizontal h-full">
          {infoblocks.map((ib) => (
            <InfoBlock
              key={ib.id}
              id={ib.id}
              title={ib.blockTitle}
              content={ib.blockContent}
              onRemove={removeInfoBlock}
            />
          ))}
        </div>

        <button
          className="relative top-[15%] h-[125%] w-[30px] ml-8 bg-secondary-lighter/5 opacity-5 rounded-[0.15em] border border-secondary-light text-secondary-light font-outfit text-[20px] font-medium backdrop-blur-[3px] transition-all duration-[250ms] ease-in-out hover:opacity-70"
          onClick={() => addInfoBlock(null)}
        >
          +
        </button>
      </div>
    </div>
  );
}
