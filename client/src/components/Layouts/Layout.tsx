import { useMemo } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import MenuBar from './LeftMenuBar/MenuBar';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const memoHeader = useMemo(() => <Header />, []);
  const memoFooter = useMemo(() => <Footer />, []);
  const memoLeftMenuBar = useMemo(() => <MenuBar />, []);

  return (
    <div className="flex flex-col overflow-visible min-h-screen">
      {memoHeader}
      {memoLeftMenuBar}
      <main className="flex-grow w-screen font-roboto">{children}</main>
      {memoFooter}
    </div>
  );
}
