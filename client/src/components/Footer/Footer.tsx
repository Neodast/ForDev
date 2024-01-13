
export default function Footer() {
  return (
    <footer className='box-border bg-blue-500 overflow-hidden flex flex-row flex-wrap items-center justify-between p-4'>
      <div className='text-sm'>
        &copy; 2024 ForDev. All copyrights reserved. Roman Valinkevych.
      </div>
      <div className='flex items-center'>
        <a href='#' className='p-2'>
          <img src='/telegram-icon.png' alt='Telegram' className='w-8 h-8 mr-2' />
        </a>
        <a href='#' className='p-2'>
          <img src='/github-icon.png' alt='GitHub' className='w84 h-8 mr-2' />
        </a>
        <a href='#' className='p-2'>
          <img src='/gitlab-icon.png' alt='GitLab' className='w-8 h-8 mr-2' />
        </a>
      </div>
    </footer>
  );
}
