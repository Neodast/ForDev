import { Container, Content, Title, UserInfo } from '@/components/Post/ui';
import PostBottomActions from '@/modules/Post/ui/BottomActions';
import PostTopActions from '@/modules/Post/ui/TopActions';
import { ProfileInfo } from '@/shared/types/profile-info.type';
import { PostData } from '@/types/board/posts/PostData';
import { Link } from 'react-router-dom';

interface PostProps {
  postData: PostData;
  profileInfo: ProfileInfo;
  commentsCount: number;
  isPreview?: boolean;
}

//TODO Add markdown support and realize(HOW???!!!) this in backend side.

export function OpenedPost(props: PostProps) {
  return (
    <Container className="w-[80%]">
      <PostTopActions
        nickname={props.profileInfo.nickname}
        postId={props.postData.id}
        postTitle={props.postData.title}
        postText={props.postData.text}
      ></PostTopActions>
      <Link to={'/posts/' + props.postData.id} className="hover:text-black">
        <UserInfo profileInfo={props.profileInfo} className="text-xl" />
        <Title
          title={props.postData.title}
          creationDate={props.postData.creationDate}
          className="text-xl"
        />
        <Content
          text={props.postData.text}
          imageLink={props.postData.imageLink}
          isPreview={props.isPreview}
          className="text-lg"
        />
      </Link>
      <PostBottomActions
        options={props.postData}
        commentsCount={props.commentsCount}
      />
    </Container>
  );
}
