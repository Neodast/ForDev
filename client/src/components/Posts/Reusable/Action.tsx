import { Button } from 'antd';
import React, { MouseEventHandler } from 'react';

interface ActionProps{
  children: React.ReactNode;
  inner: React.ReactNode;
  onClick: MouseEventHandler;
}

export default function Action(props: ActionProps) {
  return (
    <Button
    type="primary"
    shape="round"
    size="small"
    className="h-10 text-black border-t-1 border-slate-200 flex items-center mb-2"
      onClick={props.onClick}
    >
      <span className="hover:cursor-pointer">
        {props.children}
      </span>
      <span className="text-lg font-semibold hover:cursor-pointer">
        {props.inner}
      </span>
    </Button>
  );
}
