import { useTranslations } from 'next-intl';

import { CommandMenu } from '@/components/command-menu';

export function Footer() {
  const year = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className='container mx-auto flex w-full items-center justify-center md:max-w-3xl'>
      <div className='mx-auto w-full text-sm font-medium md:flex md:items-center md:justify-between'>
        <p className='text-center'>
          &copy; {year}
          <span className='me-2 ms-2'>•</span>
          Gonzalo Parra
          <span className='me-2 ms-2'>—</span>
          {t('footer.made-with')} ❤️
        </p>
        <div className='pt-2 md:pt-0'>
          <CommandMenu />
        </div>
      </div>
    </footer>
  );
}
