import { MouseEventHandler } from 'react';


interface ButtonProps {
  label: string;
  // onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ label, /*onClick*/ }: ButtonProps) {
  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]'
      // onClick={onClick}
    >
      {label}
    </button>
  );
}