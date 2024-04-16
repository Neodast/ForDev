import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container(props: ContainerProps) {
  return (
    <>
      <div className=" rounded-3xl w-[70rem] mb-6 max-w-full mx-auto p-4 shadow-xl border-t-slate-100 border-t-2 bg-background px-4 py-2 transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:cursor-default font-nimbus">
        {props.children}
      </div>
    </>
  );
}
