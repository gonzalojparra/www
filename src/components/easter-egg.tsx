'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

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
        <div className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70 animate-in fade-in duration-300'>
          <div className='relative w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300'>
            <button
              onClick={() => setIsKonamiCodeActivated(false)}
              className='absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors'
            >
              <X className='h-4 w-4 text-white' />
            </button>
            <div className='relative w-full aspect-video'>
              <iframe
                className='absolute w-full h-full'
                src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1&rel=0'
                title='Hidden surprise'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
