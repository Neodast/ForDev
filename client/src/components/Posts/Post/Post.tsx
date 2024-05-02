import React from 'react';
import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import BottomActions from './BottomActions';
import IPostUpdate from '@/types/board/posts/IPostUpdate';
import { Link } from 'react-router-dom';
import TopActions from './TopActions';
import IPostDelete from '@/types/board/posts/IPostDelete';

interface PostProps {
  title: string;
  nickname: string;
  options: IPostUpdate;
  editHandler: (post: IPostUpdate) => void;
  deleteHandler: (post: IPostDelete) => void;
  children: React.ReactNode;
}

export default function Post(props: PostProps) {
  return (
    <div className="flex-1 space-y-8 font-roboto">
      <Container>
        <div className="max-w-32 float-end space-x-2">
          <TopActions
            options={props.options}
            deleteHandler={props.deleteHandler}
            editHandler={props.editHandler}
          ></TopActions>
        </div>
        <Link to="/" className="hover:text-black">
          <UserInfo nickname={props.nickname} />
          <h3 className="text-xl font-semibold text-start pl-2 hover:cursor-pointer font-roboto">
            {props.title}
          </h3>
          <div className="text-sm hover:cursor-pointer text-start p-2 font-roboto">
            {props.children}
          </div>
        </Link>
        <BottomActions
          editHandler={props.editHandler}
          options={props.options}
        />
      </Container>
    </div>
  );
}
