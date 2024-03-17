import { memo } from 'react';
import Image from '../../Base/Images/Image';

const Footer = memo(() => {
  return (
    <footer className='box-border bg-blue-500 overflow-hidden flex flex-row flex-wrap items-center justify-between p-4'>
      <div className='text-sm'>
        &copy; 2024 ForDev. All copyrights reserved. Roman Valinkevych.
      </div>
      <div className='flex items-center'>
        <a href='#' className='p-2'>
          <Image
            src={'/icons/telegram-icon.webp'}
            alt='Telegram'
            className='w84 h-8 mr-2'
          />
        </a>
        <a href='#' className='p-2'>
          <Image
            src={'/icons/github-icon.webp'}
            alt='Github'
            className='w84 h-8 mr-2'
          />
        </a>
        <a href='#' className='p-2'>
          <Image
            src={'/icons/gitlab-icon.webp'}
            alt='Gitlab'
            className='w84 h-8 mr-2'
          />
        </a>
      </div>
    </footer>
  );
});

export default Footer;
