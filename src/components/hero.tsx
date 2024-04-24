import Link from "next/link";

export function Hero() {
  return (
    <div className='flex flex-row'>
      <Link
        href='https://github.com/gonzalojparra'
        target='_blank'
        rel='noopener noreferrer'
        className='rounded-full'
      >
        <img
          src='https://avatars.githubusercontent.com/u/93682630?v=4'
          alt='Gonzalo Parra'
          className='rounded-full w-24 h-24'
        />
      </Link>
    </div>
  )
}