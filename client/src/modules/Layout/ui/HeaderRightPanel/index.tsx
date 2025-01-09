import Role from '@/shared/models/enums/roles.enum';
import NavItem from '../../../../components/Navigation/ui/NavItem';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { Button, Dropdown } from 'antd';
import { FaUserCircle } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import useUserLogout from '@/@depr/hooks/auth/useUserLogout';

export function HeaderRightPanel() {
  const isAuth = useUserStore((state) => state.isAuth);
  const isLoading = useUserStore((state) => state.isLoading);
  const userRole = useUserStore((state) => state.user?.role);

  const { mutateAsync } = useUserLogout();

  return (
    <div>
      {isLoading ? (
        <HiDotsHorizontal className="rounded-full w-12 h-12 mt-1 mr-12 hover:border-blue-300 hover:cursor-pointer border-4 border-transparent"></HiDotsHorizontal>
      ) : (
        <>
          {isAuth ? (
            <Dropdown
              trigger={['click']}
              placement="bottomLeft"
              menu={{
                items: [
                  {
                    key: '1',
                    type: 'group',
                    className: 'text-lg font-semibold ',
                    children: [
                      // {
                      //   key: '2',
                      //   label: (
                      //     <Link
                      //       to="/"
                      //       className="hover:cursor-pointer font-semibold text-lg  "
                      //     >
                      //       Account
                      //     </Link>
                      //   ),
                      // },
                      // {
                      //   key: '3',
                      //   label: (
                      //     <Link
                      //       to="/"
                      //       className="hover:cursor-pointer font-semibold text-lg  "
                      //     >
                      //       Settings
                      //     </Link>
                      //   ),
                      // },
                      {
                        key: '4',
                        label: (
                          <Link
                            to="/posts"
                            className="hover:cursor-pointer font-semibold text-lg  "
                          >
                            My Posts
                          </Link>
                        ),
                      },
                      // ...(userRole === Role.admin
                      //   ? [
                      //       {
                      //         key: '5',
                      //         label: (
                      //           <Link
                      //             to="/"
                      //             className="hover:cursor-pointer font-semibold text-lg  "
                      //           >
                      //             Admin Panel
                      //           </Link>
                      //         ),
                      //       },
                      //     ]
                      //   : []),
                    ],
                    label: 'Navigation',
                  },
                  {
                    key: '6',
                    type: 'group',
                    className: 'text-lg font-semibold ',
                    label: 'Account',
                    children: [
                      {
                        key: '7',
                        label: (
                          <div
                            className="hover:cursor-pointer font-semibold text-lg  "
                            onClick={async () => {
                              await mutateAsync();
                            }}
                          >
                            Logout
                          </div>
                        ),
                      },
                    ],
                  },
                ],
              }}
            >
              <Button
                type="primary"
                shape="circle"
                size="middle"
                icon={
                  <FaUserCircle className="rounded-full size-16 h-12 w-12 hover:border-blue-300 hover:cursor-pointer border-4 border-transparent"></FaUserCircle>
                }
                className="rounded-full w-12 h-12 mt-1 mr-14 "
              ></Button>
            </Dropdown>
          ) : (
            <div className="mt-2 mr-12 flex space-x-2 font-roboto">
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Register</NavItem>
            </div>
          )}
        </>
      )}
    </div>
  );
}
