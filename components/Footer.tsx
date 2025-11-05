'use client';

import { useState, useEffect } from 'react';

export default function Footer() {
  const [footerText, setFooterText] = useState("少女折寿中...");
  const [showFooterText, setShowFooterText] = useState(true);

  const footerTexts = [
    "随便开播 随时下播 其实不是很建议点进来看...",
    "...这话我其实写直播间封面上了，不过我猜你肯定没看。",
    "这个遮罩是用vue写的！虽然一开始很难用但是习惯之后vue真是好文明.jpg",
    "如果主包突然没动静了可能是趣味生煎 也有可能是似了",
    "小毛龙终于把这个东西做完了然后决定自己占着不给香菇狐狸用",
    "其实我不知道这个字幕动画具体是怎么写出来的的 他莫名其妙动起来了",
    "群友问我什么时候搞sc我说现在这个弹幕量谁来发那都全是sc",
    "{Error Loading footer_banner_text[6]: Received Error [HTTP 502]}",
    "你好今天不是星期四但是请v我50我有一种称为碳水脂肪不足的综合症必须使用美国肯塔基一家尖端生物科技公司的最新型生物制剂进行治疗",
    "wei？zaima？",
  ];

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
    }, 7000);

    return () => clearInterval(interval);
  }, []);

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
