'use client'

import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { GlobeIcon } from 'lucide-react';

import type { Locale } from '@/i18n';

export function LangSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations();

  function handleLocaleChange(newLocale: Locale): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  }

  return (
    <div className='ml-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon'>
            <GlobeIcon className='h-[1.2rem] w-[1.2rem]' />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>
            {t('lang-switcher.label')}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem
            checked={locale === 'en'}
            onClick={() => {
              handleLocaleChange('en');
            }}
          >
            {t('lang-switcher.options.en')}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={locale === 'es'}
            onClick={() => {
              handleLocaleChange('es');
            }}
          >
            {t('lang-switcher.options.es')}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};