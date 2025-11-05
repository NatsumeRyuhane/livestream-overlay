'use client';

import Stage from './Stage';
import DanmakuArea from './DanmakuArea';

export default function DefaultLayout() {
  return (
    <>
      <Stage className="absolute right-[26px] top-0 shadow-[0_0_8px_#D1D2D3]" />
      <DanmakuArea className="absolute w-[500px] h-[500px] top-0 left-[26px]" />
    </>
  );
}
