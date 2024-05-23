import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero';
import { Career } from '@/components/career';
import { Projects } from '@/components/projects';
import { Contact } from '@/components/contact';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Section id='about' className='pb-24'>
        <Hero />
      </Section>

      <Section id='career' className='pb-24'>
        <Career />
      </Section>

      <Section id='projects' className='pb-24'>
        <Projects />
      </Section>

      <Section id='contact' className='pb-24'>
        <Contact />
      </Section>
    </div>
  );
}
