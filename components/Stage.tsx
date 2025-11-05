'use client';

interface StageProps {
  className?: string;
}

export default function Stage({ className = "" }: StageProps) {
  const containerHeight = 838;
  const aspectRatio = 16 / 10;

  return (
    <div
      className={`bg-stage-background ${className}`}
      style={{
        width: `${containerHeight * aspectRatio}px`,
        height: `${containerHeight}px`,
      }}
    />
  );
}
