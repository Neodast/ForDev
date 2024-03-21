import { useMemo } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const memoHeader = useMemo(() => <Header></Header>, []);
  const memoFooter = useMemo(() => <Footer></Footer>, []);

  return (
    <div className='flex flex-col min-h-screen'>
      {memoHeader}
      {children}
      {memoFooter}
    </div>
  );
}
