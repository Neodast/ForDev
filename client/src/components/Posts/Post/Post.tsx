import Container from '../Reusable/Container';
import UserInfo from '../Reusable/UserInfo';
import PostBottomActions from './PostBottomActions';
import PostUpdate from '@/types/board/posts/PostUpdate';
import { Link } from 'react-router-dom';
import PostTopActions from './PostTopActions';
import Title from '../Reusable/Title';
import Content from '../Reusable/Content';

interface PostProps {
  title: string;
  name?: string;
  surname?: string;
  nickname: string;
  options: PostUpdate;
  text: string;
  commentsCount: number;
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
        postId={props.options.id}
        postTitle={props.options.title}
        postText={props.options.text}
      ></PostTopActions>
      <Link to={'/posts/' + props.options.id} className="hover:text-black">
        <UserInfo
          name={props.name}
          surname={props.surname}
          nickname={props.nickname}
          className={props.userInfoClassName}
        />
        <Title title={props.title} className={props.titleClassName} />
        <Content text={props.text} className={props.contentClassName} />
      </Link>
      <PostBottomActions
        options={props.options}
        commentsCount={props.commentsCount}
      />
    </Container>
  );
}
