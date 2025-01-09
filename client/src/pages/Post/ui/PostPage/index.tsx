import usePostGet from '@/@depr/hooks/posts/usePostGet';
import { useUserStore } from '@/shared/models/stores/user/user.store';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import Comment from '@/features/Comment/ui/Comment/Comment';
import { OpenedPost } from '@/features/Post/ui';
import { CommentCreateForm } from '@/modules/Comment/ui/CommentCreateForm';

export default function PostPage() {
  const { postId } = useParams();
  const isAuth = useUserStore((state) => state.isAuth);
  const { data: post = null } = usePostGet(Number(postId));

  return (
    <>
      {post ? (
        <div className="text-center m-16 ml-32 mt-20 flex-1 items-center justify-center">
          <OpenedPost
            profileInfo={{
              nickname: post.author.nickname,
              name: post.author.name,
              surname: post.author.surname,
            }}
            postData={post}
            commentsCount={post.comments.length || 0}
            isPreview={true}
          ></OpenedPost>
          {isAuth && <CommentCreateForm postId={post.id}></CommentCreateForm>}
          {post.comments.map((comment) => (
            <Comment
              key={comment.text}
              id={comment.id}
              author={comment.author}
              text={comment.text}
              postId={post.id}
            />
          ))}
        </div>
      ) : (
        <Skeleton>Loading</Skeleton>
      )}
    </>
  );
}
