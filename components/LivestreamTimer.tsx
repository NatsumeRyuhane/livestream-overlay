'use client';

import { useState, useEffect, useRef } from 'react';

interface LivestreamTimerProps {
  className?: string;
}

export default function LivestreamTimer({ className = "" }: LivestreamTimerProps) {
  const [hoursElapsed, setHoursElapsed] = useState("??");
  const [minutesElapsed, setMinutesElapsed] = useState("??");
  const [secondsElapsed, setSecondsElapsed] = useState("??");
  const [framesElapsed, setFramesElapsed] = useState("??");
  const [isBlinking, setIsBlinking] = useState(false);

  const livestreamStartRef = useRef(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let elapsedTime = now.valueOf() - livestreamStartRef.current.valueOf();

      const hourElapsed = Math.floor(elapsedTime / (3600 * 1000));
      elapsedTime -= hourElapsed * 3600 * 1000;
      const minuteElapsed = Math.floor(elapsedTime / (60 * 1000));
      elapsedTime -= minuteElapsed * 60 * 1000;
      const secondElapsed = Math.floor(elapsedTime / 1000);
      elapsedTime -= secondElapsed * 1000;
      const millisecElapsed = elapsedTime;
      const frameElapsed = Math.floor(millisecElapsed / (1000/60));

      setHoursElapsed(hourElapsed >= 10 ? hourElapsed.toString() : "0" + hourElapsed.toString());
      setMinutesElapsed(minuteElapsed >= 10 ? minuteElapsed.toString() : "0" + minuteElapsed.toString());
      setSecondsElapsed(secondElapsed >= 10 ? secondElapsed.toString() : "0" + secondElapsed.toString());
      setFramesElapsed(frameElapsed >= 10 ? frameElapsed.toString() : "0" + frameElapsed.toString());
    }, 5);

    return () => clearInterval(interval);
  }, []);

  const resetLivestreamTimer = () => {
    startBlinking();
    setTimeout(() => {
      livestreamStartRef.current = new Date();
    }, 50);
  };

  const startBlinking = () => {
    setIsBlinking(true);
    setTimeout(() => {
      setIsBlinking(false);
    }, 200);
  };

  return (
    <div className={`${className}`}>
      <div
        className="flex-vertical items-start justify-end h-full select-none cursor-pointer"
        onClick={resetLivestreamTimer}
      >
        <div className="flex-horizontal items-end bg-white/20 backdrop-blur-[2px] w-full flex-grow">
          <div
            className={`flex-horizontal w-full font-outfit text-primary text-[18px] font-medium justify-start ${
              isBlinking ? 'animate-blink' : ''
            }`}
          >
            <p className="m-0 w-fit flex-horizontal justify-center">{hoursElapsed}</p>
            <p className="m-0 relative -top-[0.125em] mx-[0.1em]">:</p>
            <p className="m-0 w-fit flex-horizontal justify-center">{minutesElapsed}</p>
            <p className="m-0 relative -top-[0.125em] mx-[0.1em]">:</p>
            <p className="m-0 w-fit flex-horizontal justify-center">{secondsElapsed}</p>
            <p className="m-0 w-fit flex-horizontal justify-center ml-auto opacity-50">{framesElapsed}</p>
          </div>
        </div>
        <div className="w-full bg-primary font-outfit text-white text-[14px] font-bold px-[0.25em] opacity-90">
          LIVESTREAM TIMER
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          0% { opacity: 0; }
          25% { opacity: 1; }
          50% { opacity: 0; }
          75% { opacity: 1; }
        }
        .animate-blink {
          animation: blink 0.4s 1 normal ease-in-out;
        }
      `}</style>
    </div>
  );
}
