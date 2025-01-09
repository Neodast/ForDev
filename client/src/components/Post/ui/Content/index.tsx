import { cn } from '@/shared/lib/tailwind';
import { Image } from 'antd';
import { textSplitterHelper } from '../../models/helpers/text-splitter.helper';

type ContentProps = {
  text: string;
  imageLink?: string;
  isPreview?: boolean;
  className?: string;
};

export function Content({
  text,
  imageLink,
  isPreview,
  className,
}: ContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-1 pr-5 mb-3 text-base hover:cursor-pointer text-start p-2',
        className,
      )}
    >
      <Image
        src={imageLink}
        preview={isPreview}
        width={600}
        className="rounded-xl"
      />
      {textSplitterHelper(text)}
    </div>
  );
}
