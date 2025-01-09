import { Button, ButtonProps } from 'antd';

type ActionProps = ButtonProps;

export function Action(props: ActionProps) {
  return (
    <Button {...props}>
      <span className="text-lg font-semibold hover:cursor-pointer">
        {props.children}
      </span>
    </Button>
  );
}
