import { cn } from '@/shared/lib/utils';
import { Image } from 'antd';
import { textSplitterHelper } from '../../models/helpers/text-splitter.helper';

interface ContentProps {
  text: string;
  imageLink?: string;
  isPreview?: boolean;
  className?: string;
}

export function Content(props: ContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1 pr-5 mb-3 text-base hover:cursor-pointer text-start p-2',
        props.className,
      )}
    >
      <Image
        src={props.imageLink}
        preview={props.isPreview}
        width={600}
        className="rounded-xl"
      />
      {textSplitterHelper(props.text)}
    </div>
  );
}
