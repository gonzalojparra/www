import { useTranslations } from 'next-intl';

import { Contact } from '@/components/contact';
import { Section } from '@/components/ui/section';

export default function ContactPage() {
  const t = useTranslations();

  return (
    <Section className='pb-24' id={t('header.contact.label')}>
      <Contact />
    </Section>
  );
}
