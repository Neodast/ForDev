import { memo } from 'react';
import MenuBarItem from './MenuBarItem';
import { Collapse } from 'antd';
import { BiHeart } from 'react-icons/bi';

const LeftMenuBar = memo(() => {
  return (
    <div className="fixed font-roboto left-0 top-0 h-full w-48 bg-blue-400 border-slate-200 pt-16">
      <nav className="mx-4 flex flex-col">
        <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
          Shototam
        </MenuBarItem>
        <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
          Shototam
        </MenuBarItem>
        <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
          Shototam
        </MenuBarItem>
        <hr />
        <Collapse
          className="w-full bg-blue-400"
          ghost
          size='large'
          items={[
            {
              key: '1',
              label: 'Recent',
              children: (
                <div className='flex flex-col items-center bg-blue-400'>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                </div>
              ),
            },
            {
              key: '2',
              label: 'Saved',
              children: (
                <div className='flex flex-col items-center bg-blue-400'>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                  <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                    Shototam
                  </MenuBarItem>
                </div>
              ),
            },
          ]}
        >
          {/* <AccordionItem value="1">
            <AccordionTrigger
              className={
                navigationMenuTriggerStyle() +
                'my-2 bg-blue-400 hover:bg-blue-300 hover:no-underline'
              }
            >
              <span className="mr-10">Recent</span>
            </AccordionTrigger>
            <AccordionContent>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger
              className={
                navigationMenuTriggerStyle() +
                'my-2 bg-blue-400 hover:bg-blue-300 hover:no-underline'
              }
            >
              <span className="mr-10">Saved</span>
            </AccordionTrigger>
            <AccordionContent>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<BiHeart></BiHeart>}>
                Shototam
              </MenuBarItem>
            </AccordionContent>
          </AccordionItem> */}
        </Collapse>
      </nav>
    </div>
  );
});

export default LeftMenuBar;
