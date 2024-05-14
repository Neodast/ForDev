import React from 'react';
import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import PostBottomActions from './PostBottomActions';
import PostUpdate from '@/types/board/posts/PostUpdate';
import { Link } from 'react-router-dom';
import PostTopActions from './PostTopActions';
import { useUserStore } from '@/stores/UserStore';
import Role from '@/types/user/roles.enum';

interface PostProps {
  title: string;
  nickname: string;
  options: PostUpdate;
  children: React.ReactNode;
}

//TODO Add markdown support and realize(HOW???!!!) this in backend side.

export default function Post(props: PostProps) {
  const user = useUserStore((state) => state.user);
  const isAuthor =
    user?.nickname === props.nickname || user?.role !== Role.user;

  return (
    <div className="flex-1 space-y-8">
      <Container>
        <div className="max-w-32 float-end space-x-2">
          {isAuthor && (
            <PostTopActions
              postId={props.options.id}
              postTitle={props.options.title}
              postText={props.options.text}
            ></PostTopActions>
          )}
        </div>
        <Link to="/" className="hover:text-black">
          <UserInfo nickname={props.nickname} />
          <h3 className="text-xl font-semibold text-start pl-2 hover:cursor-pointer">
            {props.title}
          </h3>
          <div className="text-sm hover:cursor-pointer text-start p-2">
            {props.children}
          </div>
        </Link>
        <PostBottomActions options={props.options} />
      </Container>
    </div>
  );
}
