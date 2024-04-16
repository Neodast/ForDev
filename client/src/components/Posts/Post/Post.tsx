import React from 'react';
import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import BottomActions from '../Reusable/BottomActions';

interface PostProps {
  title: string;
  children: React.ReactNode;
}

export default function Post(props: PostProps) {
  return (
    <>
      <Container>
        <UserInfo nickname="Username" />
        <h3 className="text-xl font-semibold text-start pl-2 hover:cursor-pointer">
          {props.title}
        </h3>
        <div className="text-sm hover:cursor-text text-start p-2">
          {props.children}
        </div>
        <BottomActions>
        </BottomActions>
      </Container>
    </>
  );
}
