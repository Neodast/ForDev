import { useMemo } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MenuBar from './LeftMenuBar/MenuBar';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const memoHeader = useMemo(() => <Header/>, []);
  const memoFooter = useMemo(() => <Footer/>, []);
  const memoLeftMenuBer = useMemo(() => <MenuBar/>, []);

  return (
    <div className='flex flex-col min-h-screen'>
      {memoHeader}
      {memoLeftMenuBer}
      <main className="flex-grow ml-32">{children}</main>
      {memoFooter}
    </div>
  );
}
