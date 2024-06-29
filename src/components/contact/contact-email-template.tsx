import { ContactEmailTemplateProps } from '@/types/components';

export function ContactEmailTemplate({
  firstName,
  lastName,
  email,
  message,
}: ContactEmailTemplateProps) {
  return (
    <div className='overflow-hidden rounded-lg bg-white shadow-lg dark:bg-neutral-900'>
      <header className='flex items-center justify-between bg-neutral-100 px-6 py-4 dark:bg-neutral-800'>
        <div className='flex items-center gap-2'>
          <span className='text-lg font-semibold'>Gonzalo Parra | Portfolio</span>
        </div>
      </header>
      <div className='space-y-4 p-6'>
        <div className='flex items-center gap-4'>
          <p className='text-lg font-medium'>
            {firstName} {lastName}
          </p>
          <p className='text-neutral-500 dark:text-neutral-400'>{email}</p>
        </div>
        <div className='whitespace-pre-wrap text-neutral-700 dark:text-neutral-300'>{message}</div>
      </div>
    </div>
  );
}
