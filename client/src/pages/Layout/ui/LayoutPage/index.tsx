import React from 'react';

interface LayoutProps {
  children: React.ReactElement;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col overflow-visible min-h-screen">
      <Header />
      <MenuBar />
      <main className="flex-grow w-screen font-roboto">{children}</main>
      <Footer />
    </div>
  );
}
