import { lazy } from 'react';
import telegramIconUrl from '../../assets/telegram-icon.png';
import GitHubIconUrl from '../../assets/github-icon.png';
import GitLabIconUrl from '../../assets/gitlab-icon.png';

const SocialIcon = lazy(() => import('../Image'));

export default function Footer() {
  return (
    <footer className='box-border bg-blue-500 overflow-hidden flex flex-row flex-wrap items-center justify-between p-4'>
      <div className='text-sm'>
        &copy; 2024 ForDev. All copyrights reserved. Roman Valinkevych.
      </div>
      <div className='flex items-center'>
        <a href='#' className='p-2'>
          <SocialIcon src={telegramIconUrl} alt='Telegram' className='w84 h-8 mr-2'></SocialIcon>
        </a>
        <a href='#' className='p-2'>
        <SocialIcon src={GitHubIconUrl} alt='Github' className='w84 h-8 mr-2'></SocialIcon>
        </a>
        <a href='#' className='p-2'>
        <SocialIcon src={GitLabIconUrl} alt='Gitlab' className='w84 h-8 mr-2'></SocialIcon>
        </a>
      </div>
    </footer>
  );
}
