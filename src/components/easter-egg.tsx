'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

import useKonamiCode from '@/hooks/use-konami-code';

export function EasterEgg() {
  const [isKonamiCodeActivated, setIsKonamiCodeActivated] = useState(false);

  const konamiSequenceByKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const handleKonamiCode = () => {
    setIsKonamiCodeActivated(true);
  };

  useKonamiCode(konamiSequenceByKey, handleKonamiCode, {
    matchMode: 'key',
  });

  return (
    <>
      {isKonamiCodeActivated ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm duration-300 animate-in fade-in'>
          <div className='relative w-full max-w-2xl overflow-hidden rounded-lg shadow-2xl duration-300 animate-in zoom-in-95'>
            <button
              className='absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 transition-colors hover:bg-black/70'
              type='button'
              onClick={() => setIsKonamiCodeActivated(false)}
            >
              <X className='h-4 w-4 text-white' />
            </button>
            <div className='relative aspect-video w-full'>
              <iframe
                allowFullScreen
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                className='absolute h-full w-full'
                src='https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1&rel=0'
                title='Hidden surprise'
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
