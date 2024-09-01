import { useTranslations } from 'next-intl';

import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero';

export default function HomePage() {
  const t = useTranslations();

  return (
    <div className='flex flex-col'>
      <Section className='pb-24' id={t('header.home.label')}>
        <Hero />
      </Section>
    </div>
  );
}
