import { Button, ButtonProps } from 'antd';
import React, { MouseEventHandler } from 'react';

interface ActionProps extends ButtonProps {
  children?: React.ReactNode;
  inner?: React.ReactNode;
  icon: React.ReactNode;
  onClick: MouseEventHandler;
}

export default function Action(props: ActionProps) {
  return (
    <Button {...props} onClick={props.onClick}>
      {(props.inner || props.children) ? <> <span className="hover:cursor-pointer">{props.children}</span>
        <span className="text-lg font-semibold hover:cursor-pointer">
          {props.inner}
        </span></> : null}
    </Button>
  );
}
