import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavigationMenuItem } from '@radix-ui/react-navigation-menu';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  children: React.ReactNode;
  to: string;
}

export default function NavItem(props: NavItemProps) {
  return (
    <NavigationMenuItem className="h-12 w-max mt-1 ml-1 font-nimbus text-md inline-flex">
      <NavLink
        to={props.to}
        className={({ isActive }) => {
          return isActive
            ? navigationMenuTriggerStyle() + 'bg-blue-400'
            : navigationMenuTriggerStyle() + 'bg-blue-500 hover:bg-blue-400';
        }}
      >
        {props.children}
      </NavLink>
    </NavigationMenuItem>
  );
}