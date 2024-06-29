import { useTranslations } from 'next-intl';

import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero/hero';
import { TechStack } from '@/components/tech-stack/tech-stack';
import { Career } from '@/components/career/career';
import { Projects } from '@/components/projects/projects';
import { Contact } from '@/components/contact/contact';

export default function Home() {
  const t = useTranslations();

  return (
    <div className='flex flex-col'>
      <Section className='pb-24' id={t('header.about.label')}>
        <Hero />
      </Section>

      <Section className='pb-24' id={t('header.tech-stack.label')}>
        <TechStack />
      </Section>

      <Section className='pb-24' id={t('header.career.label')}>
        <Career />
      </Section>

      <Section className='pb-24' id={t('header.projects.label')}>
        <Projects />
      </Section>

      <Section className='pb-24' id={t('header.contact.label')}>
        <Contact />
      </Section>
    </div>
  );
}
