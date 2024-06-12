import { Link } from 'react-router-dom';

interface LinkItemProps {
  children: React.ReactNode;
  to: string;
}

export default function LinkItem(props: LinkItemProps) {
  return (
    <Link
      to={props.to}
      className='bg-blue-400 hover:bg-blue-300 group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 transition-colors  disabled:pointer-events-none disabled:opacity-50 text-black rounded-xl font-roboto'
    >
      <span className='text-black'>{props.children}</span>
    </Link>
  );
}