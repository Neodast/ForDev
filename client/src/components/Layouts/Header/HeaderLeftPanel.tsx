import NavItem from './Navigation/NavItem';
import NavLogo from './Navigation/NavLogo';
import { Menu } from 'antd';

export default function HeaderLeftPanel() {
  return (
    <>
      <div className="flex w-auto">
        <Menu
          mode="horizontal"
          theme="dark"
          selectable={false}
          disabledOverflow={true}
          className="bg-blue-400 flex items-center hover:no-underline focus:no-underline active:no-underline no-underline font-roboto"
          items={[
            {
              key: 'logo',
              label: <NavLogo />,
            },
            {
              key: 'home',
              label: <NavItem to="/">Home</NavItem>,
            },
            {
              key: 'board',
              label: <NavItem to="/board">Board</NavItem>,
            },
            {
              key: 'posts',
              label: <NavItem to="/posts">Posts</NavItem>,
            },
            {
              key: 'threads',
              label: <NavItem to="/threads">Threads</NavItem>,
            },
          ]}
        ></Menu>
      </div>
    </>
  );
}
