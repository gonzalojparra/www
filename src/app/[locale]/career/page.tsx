import { useTranslations } from 'next-intl';

import { Section } from '@/components/ui/section';
import { Career } from '@/components/career';

export default function CareerPage() {
  const t = useTranslations();

  return (
    <Section className='pb-24' id={t('header.career.label')}>
      <Career />
    </Section>
  );
}
