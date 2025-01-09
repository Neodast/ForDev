import React from 'react';
import { Link } from 'react-router-dom';

type NavLogo = {
  children: React.ReactNode;
};

export function NavLogo({ children }: NavLogo) {
  return (
    <Link
      to="/"
      className="flex rounded-2xl h-10 hover:bg-blue-300 text-center"
    >
      <span className="text-center size-16 mx-[2.25rem] font-nimbus font-semibold text-xl mt-1 hover:no-underline focus:no-underline active:no-underline no-underline text-black">
        {children}
      </span>
    </Link>
  );
}
