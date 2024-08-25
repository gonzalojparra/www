import { useTranslations } from 'next-intl';
import Link from 'next/link';

import PixelStars from '@/components/pixel-stars';

export default function NotFoundPage() {
  const t = useTranslations();

  return (
    <>
      <div className='absolute left-0 top-0 h-full w-full object-cover'>
        <PixelStars />
      </div>

      <div className='z-10 flex flex-col items-center'>
        <h1 className='flex items-center gap-x-4 text-balance text-5xl font-bold text-white'>
          {t('not-found.title')}
        </h1>
        <p className='mx-auto max-w-3xl pt-4 text-center font-mono text-white/70 md:mb-4'>
          {t('not-found.description')}
        </p>

        <div className='flex flex-wrap items-center pt-2 md:pt-0'>
          <Link className='text-white hover:underline hover:underline-offset-4' href='/'>
            {t('not-found.button')}
          </Link>
        </div>
      </div>
    </>
  );
}
