import { cn } from '@/lib/utils';
import DateSpliter from './DateSpliter';

interface TitleProps {
  title: string;
  criationDate: Date;
  className?: string;
}

export default function Title(props: TitleProps) {
  return (
    <>
      <h2
        className={cn(
          'text-xl font-semibold text-start pl-2 hover:cursor-pointer',
          props.className,
        )}
      >
        {props.title}
        <DateSpliter date={props.criationDate} className='ml-8'/>
      </h2>
    </>
  );
}
