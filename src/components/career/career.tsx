import { useTranslations } from 'next-intl';

import { CareerItem } from '@/components/career/career-item';
import { LaptopIcon } from 'lucide-react';

export function Career() {
  const t = useTranslations();
  const careerItems = useTranslations('career-section.works');
  const keys = ['runesoft', 'universidad-nacional-del-comahue'] as const;

  return (
    <>
      <h2 className='flex gap-x-4 items-center text-3xl font-bold text-balance'>
        <LaptopIcon className='size-6' /> {t('career-section.title')}
      </h2>

      <ol className='relative border-s dark:border-neutral-600 border-neutral-400 ml-[11.5px] flex flex-col gap-8'>
        {keys.map((key) => (
          <li key={key} className='ms-7'>
            <CareerItem
              link={careerItems(`${key}.link`)}
              company={careerItems(`${key}.company`)}
              title={careerItems(`${key}.title`)}
              start={careerItems(`${key}.start`)}
              end={careerItems(`${key}.end`)}
              description={careerItems(`${key}.description`)}
              viewMore={t('career-section.view-more')}
            />
          </li>
        ))}
      </ol>
    </>
  )
}