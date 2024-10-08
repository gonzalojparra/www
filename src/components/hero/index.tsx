import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Activity } from '@/components/hero/activity';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const t = useTranslations();

  return (
    <>
      <div className='mt-4 flex flex-row items-center gap-4'>
        <h1 className='flex text-balance text-4xl font-bold text-neutral-900 dark:text-neutral-100'>
          Gonzalo Parra
        </h1>
      </div>

      <div className='flex flex-col gap-4 text-pretty font-mono text-neutral-800 dark:text-neutral-200'>
        <p className='-mt-2 mb-4 text-sm font-light'>{t('about-section.sub-title')}</p>
        <h2>{t('about-section.title')}</h2>
        <div>
          {t('about-section.description')}{' '}
          <Badge className='rounded-md shadow hover:bg-secondary' variant='outline'>
            <Link href='https://incubator.com.ar/'>
              <img
                aria-label='Incubator logo'
                className='mr-1 inline-flex'
                height='11'
                src='/logo.png'
                width='13'
              />
              {t('about-section.incubator')}
            </Link>
          </Badge>
          {', '}
          {t('about-section.incubator-about')}
        </div>
        <p>{t('about-section.description-2')}</p>
      </div>

      <div>
        <Activity />
      </div>
    </>
  );
}
