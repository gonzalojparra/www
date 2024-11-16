'use client';

import { useState } from 'react';
import useKonamiCode from '@/hooks/use-konami-code';

export const EasterEgg = () => {
  const [isKonamiCodeActivated, setIsKonamiCodeActivated] = useState(false);

  const konamiSequenceByKey = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  const handleKonamiCode = () => {
    setIsKonamiCodeActivated(true);
  };

  useKonamiCode(konamiSequenceByKey, handleKonamiCode, {
    matchMode: 'key',
  });

  return (
    <>
      {isKonamiCodeActivated && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 animate-in fade-in duration-300'>
          <div className='relative w-full max-w-2xl aspect-video animate-in slide-in-from-bottom-8 duration-500'>
            <iframe
              className='absolute w-full h-full'
              src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
              title='Hidden surprise'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};
