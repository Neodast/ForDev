import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FaUserCircle } from 'react-icons/fa';
import DropdownItemLink from './DropdownItemLink';
import { useUserStore } from '@/stores/UserStore';
import Role from '@/types/user/roles.enum';

export default function UserDropdownMenu() {
  const userRole = useUserStore((state) => state.user?.role);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FaUserCircle className="rounded-full w-12 h-12 mt-1 mr-4 hover:border-blue-300 hover:cursor-pointer border-4 border-transparent"></FaUserCircle>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4 shadow-md">
          <DropdownMenuGroup>
            <DropdownItemLink to="/">Account</DropdownItemLink>
            <DropdownItemLink to="/">Settings</DropdownItemLink>
            <DropdownItemLink to="/">MyPosts</DropdownItemLink>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {userRole === Role.ADMIN && (
            <>
              <DropdownMenuGroup>
                <DropdownItemLink to="/">AdminPannel</DropdownItemLink>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            <DropdownItemLink to="/">Logout</DropdownItemLink>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
