import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

export default function NavLogo() {
  return (
    <NavigationMenuItem
      className={
        navigationMenuTriggerStyle() + 'bg-blue-400 hover:bg-blue-300 mx-2'
      }
    >
      <Link to="/">
        <span className="size-16 mt-[-0.25rem] mx-[2.25rem] font-nimbus font-semibold text-xl">
          /ForDev
        </span>
      </Link>
    </NavigationMenuItem>
  );
}
