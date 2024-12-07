import { cn } from '@/shared/lib/utils';
import { Card } from 'antd';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: ContainerProps) {
  return (
    <>
      <Card
        className={cn(
          'flex-1 space-y-8 rounded-xl w-auto max-w-[200rem] shadow-sm mb-6 mr-64 ml-40 transition-colors disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-50 hover:cursor-pointer font-nimbus',
          props.className,
        )}
      >
        {props.children}
      </Card>
    </>
  );
}
