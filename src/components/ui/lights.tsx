import { cn } from '@/lib/utils';

export function Lights({ className }: { className?: string }) {
  return (
    <div className={cn('fixed inset-0 z-0', className)}>
      <div className='conic-gradient-bg absolute inset-0' />
    </div>
  );
}
