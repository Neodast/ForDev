import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import PostBottomActions from './PostBottomActions';
import { Link } from 'react-router-dom';
import PostTopActions from './PostTopActions';
import Title from '../Reusable/Title';
import Content from '../Reusable/Content';
import { PostData } from '@/types/board/posts/PostData';

interface PostProps {
  postData: PostData;
  name?: string;
  surname?: string;
  nickname: string;
  commentsCount: number;
  //---------------------------------//
  containerClassName?: string;
  userInfoClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

//TODO Add markdown support and realize(HOW???!!!) this in backend side.

export default function Post(props: PostProps) {
  return (
    <Container className={props.containerClassName}>
      <PostTopActions
        nickname={props.nickname}
        postId={props.postData.id}
        postTitle={props.postData.title}
        postText={props.postData.text}
      ></PostTopActions>
      <Link to={'/posts/' + props.postData.id} className="hover:text-black">
        <UserInfo
          name={props.name}
          surname={props.surname}
          nickname={props.nickname}
          className={props.userInfoClassName}
        />
        <Title title={props.postData.title} className={props.titleClassName} />
      <Content
        text={props.postData.text}
        imageLink={props.postData.imageLink}
        className={props.contentClassName}
      />
      </Link>
      <PostBottomActions
        options={props.postData}
        commentsCount={props.commentsCount}
      />
    </Container>
  );
}
