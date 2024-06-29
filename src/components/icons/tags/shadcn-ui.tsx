export function ShadcnIcon({ ...props }) {
  return (
    <svg
      {...props}
      className={`rounded-[2px] ${props.className || ''}`}
      viewBox='0 0 256 256'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0h256v256H0z' fill='#000' />
      <path d='M208 128l-80 80M192 40L40 192' fill='none' stroke='#FFFFFF' strokeWidth='8' />
    </svg>
  );
}
