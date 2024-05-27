import { useTranslations } from 'next-intl';

import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero';
import { TechStack } from '@/components/tech-stack';
import { Career } from '@/components/career';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';

export default function Home() {
  const t = useTranslations();
  
  return (
    <div className='flex flex-col'>
      <Section id={t('header.about.label')} className='pb-24'>
        <Hero />
      </Section>

      <Section id={t('header.tech-stack.label')} className='pb-24'>
        <TechStack />
      </Section>

      <Section id={t('header.career.label')} className='pb-24'>
        <Career />
      </Section>

      <Section id={t('header.projects.label')} className='pb-24'>
        <Projects />
      </Section>

      <Section id={t('header.contact.label')} className='pb-24'>
        <Contact />
      </Section>
    </div>
  );
}
