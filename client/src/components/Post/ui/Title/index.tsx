import { cn } from '@/shared/lib/utils';
import { dataSplitterHelper } from '../../models/helpers/date-splitter.helper';

interface TitleProps {
  title: string;
  creationDate: Date;
  className?: string;
}

export function Title(props: TitleProps) {
  return (
    <>
      <h2
        className={cn(
          'text-xl font-semibold text-start pl-2 hover:cursor-pointer',
          props.className,
        )}
      >
        {props.title}
        <span className="ml-8">{dataSplitterHelper(props.creationDate)}</span>
      </h2>
    </>
  );
}
