import { ThreadData } from '@/types/board/threads/ThreadData';
import Container from '../Reusable/Container';
import PostTopActions from '../Post/PostTopActions';
import UserInfo from '../Reusable/UserInfo';
import { Link } from 'react-router-dom';
import Title from '../Reusable/Title';
import Content from '../Reusable/Content';
import PostBottomActions from '../Post/PostBottomActions';

interface ThreadProps {
  postData: ThreadData;
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

export default function Thread(props: ThreadProps) {
  return (
    <Container className={props.containerClassName}>
      <PostTopActions
        nickname={props.nickname}
        postId={props.postData.id}
        postTitle={props.postData.title}
        postText={props.postData.text}
      ></PostTopActions>
      <Link to={'/threads/' + props.postData.id} className="hover:text-black">
        <UserInfo
          name={props.name}
          surname={props.surname}
          nickname={props.nickname}
          className={props.userInfoClassName}
        />
        <Title title={props.postData.title} criationDate={props.postData.creationDate} className={props.titleClassName} />
      <Content
        text={props.postData.text}
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