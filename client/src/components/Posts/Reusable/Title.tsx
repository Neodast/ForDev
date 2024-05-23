import { cn } from '@/lib/utils';

interface TitleProps {
  title: string;
  className?: string;
}

export default function Title(props: TitleProps) {
  return (
    <h2
      className={cn(
        'text-xl font-semibold text-start pl-2 hover:cursor-pointer',
        props.className,
      )}
    >
      {props.title}
    </h2>
  );
}
