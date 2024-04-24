import { Section } from '@/components/ui/section';
import { Hero } from '@/components/hero';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Section id='about' className='pb-24'>
        <Hero />
      </Section>
    </div>
  );
}
