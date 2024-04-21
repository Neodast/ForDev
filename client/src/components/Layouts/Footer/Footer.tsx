import { memo } from 'react';
import { FaGithub, FaGitlab, FaTelegram } from 'react-icons/fa';

const Footer = memo(() => {
  return (
    <footer className="box-border font-roboto bg-blue-400 overflow-hidden flex flex-row flex-wrap items-center justify-between p-4 z-50 shadow-inner shadow-blue-500">
      <div className="text-sm">
        &copy; 2024 ForDev. All copyrights reserved. Roman Valinkevych.
      </div>
      <div className="flex items-center">
        <a href="#" className="p-2">
          <FaTelegram className="size-10"></FaTelegram>
        </a>
        <a href="#" className="p-2">
          <FaGithub className="size-10"></FaGithub>
        </a>
        <a href="#" className="p-2">
          <FaGitlab className="size-10"></FaGitlab>
        </a>
      </div>
    </footer>
  );
});

export default Footer;
