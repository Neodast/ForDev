import Container from '../../components/Post/ui/Container';
import UserInfo from '../../components/Post/ui/UserInfo';
import PostBottomActions from '../../modules/Post/ui/BottomActions';
import { Link } from 'react-router-dom';
import PostTopActions from '../../modules/Post/ui/TopActions';
import Title from '../../components/Post/ui/Title';
import Content from '../../components/Post/Reusable/Content';
import { PostData } from '@/types/board/posts/PostData';

interface PostProps {
  postData: PostData;
  name?: string;
  surname?: string;
  nickname: string;
  commentsCount: number;
  isPreview?: boolean;
  //---------------------------------//
  containerClassName?: string;
  userInfoClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}

//TODO Add markdown support and realize(HOW???!!!) this in backend side.

export function Post(props: PostProps) {
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
        <Title
          title={props.postData.title}
          creationDate={props.postData.creationDate}
          className={props.titleClassName}
        />
        <Content
          text={props.postData.text}
          imageLink={props.postData.imageLink}
          isPreview={props.isPreview}
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
