import { useTranslations } from 'next-intl';

import { Card } from '@/components/ui/card';
import { RocketIcon } from 'lucide-react';

import { data } from '@/constants';

export function TechStack() {
  const t = useTranslations();
  
  const { stack } = data;

  return (
    <>
      <h2 className='flex gap-x-4 items-center text-3xl font-bold text-balance'>
        <RocketIcon className='size-6' /> {t('tech-stack.title')}
      </h2>
      <p className='font-mono mx-auto max-w-3xl md:mb-4'>
        {t('tech-stack.description')}
      </p>
      
      <div className='grid grid-cols-3 gap-8'>
        {stack.map(({ name, Icon }) => (
          <div key={name} className='group'>
            <Card className='flex flex-col items-center justify-center p-6 border rounded-lg transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:shadow-lg'>
              <Icon className='mb-4 h-12 w-12' />
              <div className='text-center'>{name}</div>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}