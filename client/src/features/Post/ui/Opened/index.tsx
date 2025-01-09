import { Container, Content, Title, UserInfo } from '@/components/Post/ui';
import { ProfileInfo } from '@/shared/models/types/profile-info.type';
import { PostData } from '@/@depr/types/board/posts/PostData';
import { Link } from 'react-router-dom';
import { PostBottomActions, PostTopActions } from '@/modules/Post/ui';
import { isPreviewDefault } from '../../config/constants';

type PostProps = {
  postData: PostData;
  profileInfo: ProfileInfo;
  commentsCount: number;
  isPreview?: boolean;
};

export function OpenedPost({
  commentsCount,
  postData,
  profileInfo,
  isPreview = isPreviewDefault,
}: PostProps) {
  return (
    <Container className="w-[80%]">
      <PostTopActions
        nickname={profileInfo.nickname}
        postId={postData.id}
        postTitle={postData.title}
        postText={postData.text}
      ></PostTopActions>
      <Link to={'/posts/' + postData.id} className="hover:text-black">
        <UserInfo profileInfo={profileInfo} className="text-xl" />
        <Title
          title={postData.title}
          creationDate={postData.creationDate}
          className="text-xl"
        />
        <Content
          text={postData.text}
          imageLink={postData.imageLink}
          isPreview={isPreview}
          className="text-lg"
        />
      </Link>
      <PostBottomActions id={postData.id} commentsCount={commentsCount} />
    </Container>
  );
}
