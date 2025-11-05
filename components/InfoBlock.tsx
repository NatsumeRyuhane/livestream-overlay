'use client';

import { useRef, useEffect, KeyboardEvent } from 'react';

interface InfoBlockProps {
  id: number;
  title: string;
  content: string;
  onRemove: (id: number) => void;
}

export default function InfoBlock({ id, title, content, onRemove }: InfoBlockProps) {
  const decoratorRef = useRef<HTMLDivElement>(null);
  const decoratorWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const decoratorWrapper = decoratorWrapperRef.current;
    const decorator = decoratorRef.current;

    if (!decoratorWrapper || !decorator) return;

    const handleMouseEnter = () => {
      decorator.classList.add('expanded');
    };

    const handleMouseLeave = () => {
      decorator.classList.remove('expanded');
    };

    const handleClick = () => {
      onRemove(id);
    };

    decoratorWrapper.addEventListener('mouseenter', handleMouseEnter);
    decoratorWrapper.addEventListener('mouseleave', handleMouseLeave);
    decoratorWrapper.addEventListener('click', handleClick);

    return () => {
      decoratorWrapper.removeEventListener('mouseenter', handleMouseEnter);
      decoratorWrapper.removeEventListener('mouseleave', handleMouseLeave);
      decoratorWrapper.removeEventListener('click', handleClick);
    };
  }, [id, onRemove]);

  const preventNewline = (event: KeyboardEvent<HTMLParagraphElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      (event.target as HTMLElement).blur();
    }
  };

  return (
    <div className="flex-horizontal h-full w-fit items-start ml-8 whitespace-nowrap font-source-han-serif text-[rgb(50,50,50)]">
      <div ref={decoratorWrapperRef} className="w-5 h-full cursor-pointer">
        <div
          ref={decoratorRef}
          className="h-[6px] w-5 bg-primary transition-all duration-200 ease-out"
          style={{ willChange: 'height' }}
        />
      </div>
      <div className="flex-vertical items-start justify-start relative -top-[10px]">
        <p
          className="m-0 text-[25px] pl-[0.25em] min-w-[2em] whitespace-nowrap outline-none focus-visible:border-b-2 focus-visible:border-primary focus-visible:rounded-[2px]"
          contentEditable
          suppressContentEditableWarning
          onKeyDown={preventNewline}
        >
          {title}
        </p>
        <p
          className="m-0 pl-8 text-[35px] relative -top-[5px] whitespace-nowrap outline-none focus-visible:border-b-[3px] focus-visible:border-primary focus-visible:rounded-[3px]"
          contentEditable
          suppressContentEditableWarning
          onKeyDown={preventNewline}
        >
          {content}
        </p>
      </div>
      <style jsx>{`
        .expanded {
          height: 100% !important;
        }
      `}</style>
    </div>
  );
}
