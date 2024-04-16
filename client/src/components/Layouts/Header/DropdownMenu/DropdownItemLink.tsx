import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import React from 'react';
import { Link } from 'react-router-dom';

interface DropdownItemLinkProps {
  children: React.ReactNode;
  to: string;
}

export default function DropdownItemLink(props: DropdownItemLinkProps) {
  return (
    <DropdownMenuItem>
      <Link to={props.to} className="hover:cursor-pointer">{props.children}</Link>
    </DropdownMenuItem>
  );
}
