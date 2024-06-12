import Layout from '@/components/Layouts/Layout';
import Comment from '@/components/Posts/Comment/Comment';
import CommentCreateForm from '@/components/Posts/Comment/CommentCreateForm';
import Container from '@/components/Posts/Reusable/Container';
import Thread from '@/components/Posts/Thread/Thread';
import useThreadGet from '@/hooks/threads/useThreadGet';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

export default function ThreadPage() {
  const { postId } = useParams();
  const { data: post = null } = useThreadGet(Number(postId));

  return (
    <Layout>
      {post ? (
        <div className="text-center m-16 ml-32 mt-20 flex-1 items-center justify-center">
          <Thread
            nickname={post.author.nickname}
            name={post?.author.name}
            surname={post?.author.surname}
            postData={post}
            commentsCount={post.comments.length || 0}
            containerClassName="w-[80%]"
            titleClassName="text-xl"
            contentClassName="text-lg"
            userInfoClassName="text-xl"
          ></Thread>
          <CommentCreateForm postId={post.id}></CommentCreateForm>
          {post.comments.map((comment) => (
            <Comment
              key={comment.text}
              author={comment.author}
              text={comment.text}
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
