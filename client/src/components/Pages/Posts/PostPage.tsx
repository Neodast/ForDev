import Layout from '@/components/Layouts/Layout';
import usePostGet from '@/hooks/posts/usePostGet';
import { useUserStore } from '@/app/store/userStore';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import Comment from '@/components/Comment/Comment';
import { OpenedPost } from '@/features/Post/ui';
import CommentCreateForm from '@/components/Comment/CommentCreateForm';

export default function PostPage() {
  const { postId } = useParams();
  const { data: post = null } = usePostGet(Number(postId));
  const isAuth = useUserStore((state) => state.isAuth);

  return (
    <Layout>
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
        <
      )}
    </Layout>
  );
}
