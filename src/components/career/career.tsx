import { useTranslations } from 'next-intl';
import { LaptopIcon } from 'lucide-react';

import { CareerItem } from '@/components/career/career-item';

export function Career() {
  const t = useTranslations();
  const careerItems = useTranslations('career-section.works');
  const keys = ['runesoft', 'universidad-nacional-del-comahue'] as const;

  return (
    <>
      <h2 className='flex items-center gap-x-4 text-balance text-3xl font-bold'>
        <LaptopIcon className='size-6' /> {t('career-section.title')}
      </h2>

      <ol className='relative ml-[11.5px] flex flex-col gap-8 border-s border-neutral-400 dark:border-neutral-600'>
        {keys.map((key) => (
          <li key={key} className='ms-7'>
            <CareerItem
              badges={careerItems(`${key}.badges`)}
              company={careerItems(`${key}.company`)}
              description={careerItems(`${key}.description`)}
              end={careerItems(`${key}.end`)}
              link={careerItems(`${key}.link`)}
              start={careerItems(`${key}.start`)}
              title={careerItems(`${key}.title`)}
              viewMore={t('career-section.view-more')}
            />
          </li>
        ))}
      </ol>
    </>
  );
}
