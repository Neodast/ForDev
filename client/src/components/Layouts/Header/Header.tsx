import HeaderLeftPanel from './HeaderLeftPanel';
import HeaderRightPanel from './HeaderRightPanel';
import { memo } from 'react';

const Header = memo(() => {
  return (
    <>
      <header className='box-border overflow-hidden h-16 bg-blue-500 flex flex-row justify-between flex-wrap'>
        <HeaderLeftPanel />
        <HeaderRightPanel />
      </header>
    </>
  );
});

export default Header;
