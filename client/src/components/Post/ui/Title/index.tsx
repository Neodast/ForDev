import { cn } from '@/shared/lib/tailwind';
import { dataSplitterHelper } from '../../models/helpers/date-splitter.helper';

type TitleProps = {
  title: string;
  creationDate: Date;
  className?: string;
};

export function Title({ creationDate, title, className }: TitleProps) {
  return (
    <>
      <h2
        className={cn(
          'text-xl font-semibold text-start pl-2 hover:cursor-pointer',
          className,
        )}
      >
        {title}
        <span className="ml-8">{dataSplitterHelper(creationDate)}</span>
      </h2>
    </>
  );
}
