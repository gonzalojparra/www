import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero';
import { Career } from '@/components/career';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Section id='about' className='pb-24'>
        <Hero />
      </Section>

      <Section id='career' className='pb-24'>
        <Career />
      </Section>
    </div>
  );
}
