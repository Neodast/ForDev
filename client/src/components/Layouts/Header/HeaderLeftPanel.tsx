import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import NavItem from './Navigation/NavItem';
import NavLogo from './Navigation/NavLogo';

export default function HeaderLeftPanel() {
  return (
    <>
      <div className="flex flex-row flex-1 flex-wrap">
        <NavigationMenu>
          <NavigationMenuList>
            <NavLogo></NavLogo>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/board">Board</NavItem>
            <NavItem to="/posts">Posts</NavItem>
            <NavItem to="/threads">Threads</NavItem>
            <NavItem to="/quizzes">Quizzes</NavItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
