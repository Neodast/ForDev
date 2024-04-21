import React from 'react';
import NavItem from '../Header/Navigation/NavItem';

interface NavItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  to: string;
}

export default function MenuBarItem(props: NavItemProps) {
  return (
    <div className="h-12 w-m font-nimbus text-md inline-flex bg-blue-400">
      <NavItem to={props.to}>
        <span className="w-32 items-center flex">
          <span className="mr-2 s-4">{props.icon}</span>
          {props.children}
        </span>
      </NavItem>
    </div>
  );
}
