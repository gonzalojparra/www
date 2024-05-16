export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='flex justify-center items-center w-full mx-auto md:max-w-3xl container'>
      <div className='w-full mx-auto md:flex md:items-center md:justify-between text-sm font-medium'>
        <p>
          &copy; {year}
          <span className='ms-2 me-2'>•</span>
          Gonzalo Parra
          <span className='ms-2 me-2'>—</span>
          All rights reserved.
        </p>
        <div className='flex flex-wrap items-center justify-center pt-2 md:pt-0'>
          <p>Made with ❤️</p>
        </div>
      </div>
    </footer>
  )
}