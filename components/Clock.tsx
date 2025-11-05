'use client';

import { useState, useEffect } from 'react';

interface ClockProps {
  timezone?: string;
  label?: string;
  className?: string;
}

export default function Clock({ timezone, label = "CURRENT TIME", className = "" }: ClockProps) {
  const [year, setYear] = useState("????");
  const [month, setMonth] = useState("??");
  const [day, setDay] = useState("??");
  const [hour, setHour] = useState("??");
  const [minute, setMinute] = useState("??");
  const [second, setSecond] = useState("??");
  const [frame, setFrame] = useState("??");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (timezone) {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: timezone,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        });

        const parts = formatter.formatToParts(now);
        const timeData = Object.fromEntries(parts.map(({type, value}) => [type, value]));

        setYear(timeData.year || "????");
        setMonth(timeData.month || "??");
        setDay(timeData.day || "??");
        setHour(timeData.hour || "??");
        setMinute(timeData.minute || "??");
        setSecond(timeData.second || "??");
      } else {
        // timezone unspecified, using local time
        setYear(now.getFullYear().toString());
        setMonth(now.getMonth() + 1 >= 10 ? (now.getMonth() + 1).toString() : "0" + (now.getMonth() + 1).toString());
        setDay(now.getDate() >= 10 ? now.getDate().toString() : "0" + now.getDate().toString());
        setHour(now.getHours() >= 10 ? now.getHours().toString() : "0" + now.getHours().toString());
        setMinute(now.getMinutes() >= 10 ? now.getMinutes().toString() : "0" + now.getMinutes().toString());
        setSecond(now.getSeconds() >= 10 ? now.getSeconds().toString() : "0" + now.getSeconds().toString());
      }

      // frame number is calculated based on the current millisecond, timezone independent
      const frames = Math.floor(now.getMilliseconds() / (1000/60));
      setFrame(frames >= 10 ? frames.toString() : "0" + frames.toString());
    }, 10);

    return () => clearInterval(interval);
  }, [timezone]);

  const clockAccentColor = 'hsl(0, 0%, 51%)';

  return (
    <div className={`flex-vertical items-start justify-end overflow-hidden h-full select-none ${className}`}>
      <div className="bg-white/20 backdrop-blur-[2px] min-w-[125px]">
        <div className="flex-horizontal font-outfit text-[8px] font-light justify-start w-fit">
          <p className="m-0" style={{ color: clockAccentColor }}>{year}</p>
          <p className="m-0 relative -top-[0.125em] mx-[0.1em]" style={{ color: clockAccentColor }}>-</p>
          <p className="m-0" style={{ color: clockAccentColor }}>{month}</p>
          <p className="m-0 relative -top-[0.125em] mx-[0.1em]" style={{ color: clockAccentColor }}>-</p>
          <p className="m-0" style={{ color: clockAccentColor }}>{day}</p>
        </div>
        <div className="flex-horizontal font-outfit text-[18px] font-medium justify-start" style={{ color: clockAccentColor }}>
          <p className="m-0 w-fit flex-horizontal justify-center">{hour}</p>
          <p className="m-0 relative -top-[0.125em] mx-[0.1em]">:</p>
          <p className="m-0 w-fit flex-horizontal justify-center">{minute}</p>
          <p className="m-0 relative -top-[0.125em] mx-[0.1em]">:</p>
          <p className="m-0 w-fit flex-horizontal justify-center">{second}</p>
        </div>
      </div>
      <div
        className="w-full font-outfit text-white text-[14px] font-bold px-[0.25em] opacity-90"
        style={{ backgroundColor: clockAccentColor }}
      >
        {label}
      </div>
    </div>
  );
}
