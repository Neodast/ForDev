import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

export default function NavItem(props: NavItemProps) {
  return (
    <NavigationMenuItem className="h-12 w-max mt-2 mb-1 ml-2 font-nimbus text-md inline-flex">
      <NavLink
        to={props.to}
        className={({ isActive }) => {
          return isActive
            ? navigationMenuTriggerStyle() + 'bg-blue-300'
            : navigationMenuTriggerStyle() + 'bg-blue-400 hover:bg-blue-300';
        }}
      >
        {props.children}
      </NavLink>
    </NavigationMenuItem>
  );
}