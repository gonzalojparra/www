import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFoundPage() {
  const t = useTranslations();
  
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className='absolute top-0 left-0 w-full h-full object-cover'
      >
        <source src='/assets/404.webm' type='video/webm' />
      </video>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-75'></div>

      <div className='z-10 flex flex-col items-center'>
        <h1 className='flex gap-x-4 items-center text-5xl font-bold text-balance text-white'>
          {t('not-found.title')}
        </h1>
        <p className='font-mono mx-auto max-w-3xl md:mb-4 pt-4 text-white/70'>
          {t('not-found.description')}
        </p>

        <div className='flex flex-wrap items-center pt-2 md:pt-0'>
          <Link className='hover:underline hover:underline-offset-4 text-white' href='/'>
            {t('not-found.button')}
          </Link>
        </div>
      </div>
    </>
  )
}