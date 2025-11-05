'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DefaultLayout from '@/components/DefaultLayout';
import NoStageLayout from '@/components/NoStageLayout';

export default function Home() {
  const [activeLayout, setActiveLayout] = useState(0);
  const layouts = ['default-layout', 'no-stage-layout'];

  const switchLayout = () => {
    setActiveLayout((prev) => {
      const next = prev + 1;
      return next >= layouts.length ? 0 : next;
    });
  };

  return (
    <div
      className="absolute top-0 left-0 w-[1920px] h-[1080px] bg-cover overflow-hidden flex-vertical"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="w-full h-[125px] box-border overflow-hidden">
        <Header onSwitchLayout={switchLayout} />
      </div>

      <div className="relative w-full overflow-hidden flex-grow">
        {activeLayout === 0 && <DefaultLayout />}
        {activeLayout === 1 && <NoStageLayout />}
      </div>

      <div className="w-full h-[93.75px]">
        <Footer />
      </div>
    </div>
  );
}
