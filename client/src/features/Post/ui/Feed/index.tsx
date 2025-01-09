import { Container, Content, Title, UserInfo } from '@/components/Post/ui';
import { PostBottomActions } from '@/modules/Post/ui/PostBottomActions';
import { PostTopActions } from '@/modules/Post/ui/PostTopActions';
import { PostData } from '@/@depr/types/board/posts/PostData';
import { ProfileInfo } from '@/shared/models/types/profile-info.type';
import { Link } from 'react-router-dom';
import { isPreviewDefault } from '../../config/constants';

type PostProps = {
  postData: PostData;
  profileInfo: ProfileInfo;
  commentsCount: number;
  isPreview?: boolean;
};

export function FeedPost({
  commentsCount,
  postData,
  profileInfo,
  isPreview = isPreviewDefault,
}: PostProps) {
  return (
    <Container>
      <PostTopActions
        nickname={profileInfo.nickname}
        postId={postData.id}
        postTitle={postData.title}
        postText={postData.text}
      ></PostTopActions>
      <Link to={'/posts/' + postData.id} className="hover:text-black">
        <UserInfo profileInfo={profileInfo} className="text-base" />
        <Title
          title={postData.title}
          creationDate={postData.creationDate}
          className="text-base"
        />
        <Content
          text={postData.text}
          imageLink={postData.imageLink}
          isPreview={isPreview}
          className="text-sm"
        />
      </Link>
      <PostBottomActions id={postData.id} commentsCount={commentsCount} />
    </Container>
  );
}
