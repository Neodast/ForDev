import { memo } from 'react';
import MenuBarItem from './MenuBarItem';
import { Heart } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const LeftMenuBar = memo(() => {
  return (
    <div className="fixed left-0 top-0 h-full w-48 bg-blue-400 border-slate-200 pt-16">
      <nav className="mx-4 flex flex-col">
        <MenuBarItem to="/" icon={<Heart></Heart>}>
          Shototam
        </MenuBarItem>
        <MenuBarItem to="/" icon={<Heart></Heart>}>
          Shototam
        </MenuBarItem>
        <MenuBarItem to="/" icon={<Heart></Heart>}>
          Shototam
        </MenuBarItem>
        <hr />
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="1">
            <AccordionTrigger
              className={
                navigationMenuTriggerStyle() +
                'my-2 bg-blue-400 hover:bg-blue-300 hover:no-underline'
              }
            >
              <span className="mr-10">Recent</span>
            </AccordionTrigger>
            <AccordionContent>
              <MenuBarItem to="/" icon={<Heart></Heart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<Heart></Heart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<Heart></Heart>}>
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
              <MenuBarItem to="/" icon={<Heart></Heart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<Heart></Heart>}>
                Shototam
              </MenuBarItem>
              <MenuBarItem to="/" icon={<Heart></Heart>}>
                Shototam
              </MenuBarItem>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    </div>
  );
});

export default LeftMenuBar;
