import { Button, ButtonProps } from 'antd';
import React from 'react';

interface ActionProps extends ButtonProps {
  children?: React.ReactNode;
  inner?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Action(props: ActionProps) {
  return (
    <Button {...props}>
      {props.inner || props.children ? (
        <>
          {' '}
          <span className="hover:cursor-pointer">{props.children}</span>
          <span className="text-lg font-semibold hover:cursor-pointer">
            {props.inner}
          </span>
        </>
      ) : null}
    </Button>
  );
}
