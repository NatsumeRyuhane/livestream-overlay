'use client';

import { useState, useEffect } from 'react';
import { FooterConfig } from '@/types/profile';

interface FooterProps {
  config?: FooterConfig;
}

export default function Footer({ config }: FooterProps) {
  const footerTexts = config?.texts || [
    "随便开播 随时下播 其实不是很建议点进来看...",
    "...这话我其实写直播间封面上了，不过我猜你肯定没看。",
    "这个遮罩是用React+Next.js写的！",
  ];

  const rotationInterval = config?.rotationInterval || 7000;

  const [footerText, setFooterText] = useState(footerTexts[0] || "");
  const [showFooterText, setShowFooterText] = useState(true);

  useEffect(() => {
    let displayFooterTextIndex = -1;

    const interval = setInterval(() => {
      setShowFooterText(false);
      displayFooterTextIndex += 1;

      if (displayFooterTextIndex === footerTexts.length) {
        displayFooterTextIndex = 0;
      }

      setFooterText(footerTexts[displayFooterTextIndex]);

      setTimeout(() => {
        setShowFooterText(true);
      }, 2000);
    }, rotationInterval);

    return () => clearInterval(interval);
  }, [footerTexts, rotationInterval]);

  const primaryAccentColorH = 200;
  const primaryAccentColorS = 100;
  const primaryAccentColorL = 47.6;
  const primaryAccentColorHCoefficient = 1.1355;

  return (
    <div className="relative h-full w-full bg-secondary">
      <div
        className="absolute right-0 top-0 w-[879px] h-full bg-cover z-10"
        style={{
          backgroundImage: "url('/images/footer-deco-1.png')",
          filter: `hue-rotate(${primaryAccentColorH * primaryAccentColorHCoefficient}deg) saturate(${primaryAccentColorS * 5}%) brightness(${primaryAccentColorL * 5}%)`,
        }}
      />
    </div>
  );
}
