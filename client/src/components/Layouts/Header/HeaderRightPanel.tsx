import NavItem from './Navigation/NavItem';
import { useUserStore } from '@/stores/UserStore';
import { HiDotsHorizontal } from 'react-icons/hi';
import UserDropdownMenu from './DropdownMenu/UserDropdownMenu';

export default function HeaderRightPanel() {
  const isAuth = useUserStore((state) => state.isAuth);
  const isLoading = useUserStore((state) => state.isLoading);

  return (
    <div>
      {isLoading ? (
        <HiDotsHorizontal className="rounded-full w-12 h-12 mt-1 mr-1 hover:border-blue-300 hover:cursor-pointer border-4 border-transparent"></HiDotsHorizontal>
      ) : (
        <>
          {isAuth ? (
            <UserDropdownMenu></UserDropdownMenu>
          ) : (
            <>
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </>
          )}
        </>
      )}
    </div>
  );
}
