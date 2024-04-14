import {
  NavigationMenu,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import NavItem from './Navigation/NavItem';

export default function HeaderLeftPanel() {
  return (
    <>
      <div className="flex flex-row flex-1 flex-wrap">
        <NavigationMenu>
          <NavigationMenuList className=''>
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
