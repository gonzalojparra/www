import { useTranslations } from 'next-intl';
import { MailIcon } from 'lucide-react';

import { ContactForm } from '@/components/contact/contact-form';

export function Contact() {
  const t = useTranslations();

  return (
    <>
      <h2 className='flex items-center gap-x-4 text-balance text-3xl font-bold'>
        <MailIcon className='size-6' />
        {t('contact-section.title')}
      </h2>
      <div className='flex flex-col gap-4 text-pretty text-neutral-800 dark:text-neutral-200'>
        <p className='mx-auto max-w-3xl font-mono md:mb-4'>{t('contact-section.description')}</p>
        <ContactForm />
      </div>
    </>
  );
}
