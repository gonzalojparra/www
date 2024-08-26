import { cn } from '@/lib/utils';

export default function Lights({ className }: { className?: React.ReactNode }) {
  return (
    <div className={cn('h-full w-full overflow-hidden', className)}>
      <div className='conic-gradient-bg relative bottom-[-400px] h-full w-full' />
    </div>
  );
}
