import { useTranslations } from 'next-intl';
import { RocketIcon } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { data } from '@/constants';

export function TechStack() {
  const t = useTranslations();

  const { stack } = data;

  return (
    <>
      <h2 className='flex items-center gap-x-4 text-balance text-3xl font-bold'>
        <RocketIcon className='size-6' /> {t('tech-stack.title')}
      </h2>
      <p className='mx-auto max-w-3xl font-mono md:mb-4'>{t('tech-stack.description')}</p>

      <div className='grid grid-cols-3 gap-8'>
        {stack.map(({ name, Icon }) => (
          <div key={name} className='group'>
            <Card className='flex flex-col items-center justify-center rounded-lg border p-6 transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-lg'>
              <Icon className='mb-4 h-12 w-12' />
              <div className='text-center'>{name}</div>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
