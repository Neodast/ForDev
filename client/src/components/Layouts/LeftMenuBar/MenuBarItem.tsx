import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  to: string;
}

export default function MenuBarItem(props: NavItemProps) {
  return (
    <NavigationMenuItem className="h-12 w-m font-nimbus text-md inline-flex">
      <NavLink
        to={props.to}
        className={({ isActive }) => {
          return isActive
            ? navigationMenuTriggerStyle() + 'bg-blue-300 inline-flex'
            : navigationMenuTriggerStyle() +
                'bg-blue-400 hover:bg-blue-300 inline-flex';
        }}
      >
        <span className="w-32 items-center flex">
          <span className="mr-2 s-4">{props.icon}</span>
          {props.children}
        </span>
      </NavLink>
    </NavigationMenuItem>
  );
}
