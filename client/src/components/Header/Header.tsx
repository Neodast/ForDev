import HeaderLeftPanel from './HeaderLeftPanel';
import { lazy } from 'react';

const RightPanel = lazy(() => import('./HeaderRightPanel'));

export default function Header() {
  return (
    <>
      <header className='box-border overflow-hidden h-16 bg-blue-500 flex flex-row justify-between flex-wrap'>
        <HeaderLeftPanel></HeaderLeftPanel>
        <RightPanel></RightPanel>
      </header>
    </>
  );
}
