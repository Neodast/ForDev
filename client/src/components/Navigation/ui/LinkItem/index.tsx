import { Link } from 'react-router-dom';

interface LinkItemProps {
  children: React.ReactElement;
  to: string;
}

export function LinkItem({ children, to }: LinkItemProps) {
  return (
    <Link
      to={to}
      className="bg-blue-400 hover:bg-blue-300 group inline-flex h-10 w-max items-center justify-center bg-background px-4 py-2 transition-colors  disabled:pointer-events-none disabled:opacity-50 text-black rounded-xl font-roboto"
    >
      <span className="text-black">{children}</span>
    </Link>
  );
}
