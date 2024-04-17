import React from 'react';
import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import BottomActions from '../Reusable/BottomActions';
import IPostUpdate from '@/types/board/IPostUpdate';

interface PostProps {
  title: string;
  nickname: string;
  likes: number;
  editHandler: (post: IPostUpdate) => void;
  children: React.ReactNode;
}


export default function Post(props: PostProps) {


  return (
    <>
      <Container>
        <UserInfo nickname={props.nickname} />
        <h3 className="text-xl font-semibold text-start pl-2 hover:cursor-pointer">
          {props.title}
        </h3>
        <div className="text-sm hover:cursor-text text-start p-2">
          {props.children}
        </div>
        <BottomActions editHandler={props.editHandler} likes={props.likes}>
        </BottomActions>
      </Container>
    </>
  );
}
