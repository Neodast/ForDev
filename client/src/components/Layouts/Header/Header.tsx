import HeaderLeftPanel from './HeaderLeftPanel';
import HeaderRightPanel from './HeaderRightPanel';
import { memo } from 'react';

const Header = memo(() => {
  return (
    <>
      <header className="box-border overflow-hidden w-screen h-14 bg-blue-400 flex flex-row justify-between flex-wrap fixed top-0 z-50 shadow-2xl font-roboto">
        <HeaderLeftPanel />
        <HeaderRightPanel />
      </header>
    </>
  );
});

export default Header;
