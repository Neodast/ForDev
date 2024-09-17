import Layout from '@/components/Layouts/Layout';
import Comment from '@/components/Posts/Comment/Comment';
import CommentCreateForm from '@/components/Posts/Comment/CommentCreateForm';
import Post from '@/components/Posts/Post/Post';
import Container from '@/components/Posts/Reusable/Container';
import usePostGet from '@/hooks/posts/usePostGet';
import { useUserStore } from '@/stores/UserStore';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { postId } = useParams();
  const { data: post = null } = usePostGet(Number(postId));
  const isAuth = useUserStore((state) => state.isAuth);

  return (
    <Layout>
      {post ? (
        <div className="text-center m-16 ml-32 mt-20 flex-1 items-center justify-center">
          <Post
            nickname={post.author.nickname}
            name={post?.author.name}
            surname={post?.author.surname}
            postData={post}
            commentsCount={post.comments.length || 0}
            isPreview={true}
            containerClassName="w-[80%]"
            titleClassName="text-xl"
            contentClassName="text-lg"
            userInfoClassName="text-xl"
          ></Post>
          {isAuth &&<CommentCreateForm postId={post.id}></CommentCreateForm>}
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
        <>
          <Container className="mt-20 mb-6 mr-32 ml-72 h-56">
            <Skeleton avatar={true} />
          </Container>
          <Container className="mb-6 mr-32 ml-72 h-32 w-[50%]">
            <Skeleton avatar={false} />
          </Container>
        </>
      )}
    </Layout>
  );
}
