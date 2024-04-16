import React, { ButtonHTMLAttributes } from 'react';

interface ActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  inner: React.ReactNode;
}

export default function Action(props: ActionProps) {
  return (
    <button
      className="flex items-center mb-2 mr-2 border-2 rounded-xl w-16 bg-blue-200 hover:bg-blue-300"
      {...props}
    >
      <span className="flex-shrink-0 hover:cursor-pointer">
        {props.children}
      </span>
      <span className="text-lg font-semibold hover:cursor-pointer">
        {props.inner}
      </span>
    </button>
  );
}
