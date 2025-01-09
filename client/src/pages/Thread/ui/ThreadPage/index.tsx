import Layout from '@/components/Layouts/Layout';
import Comment from '@/features/Comment/ui/Comment/Comment';
import CommentCreateForm from '@/modules/Comment/ui/CommentCreateForm';
import Container from '@/components/Post/ui/Container';
import Thread from '@/features/Thread/ui/Thread/Thread';
import useThreadGet from '@/@depr/hooks/threads/useThreadGet';
import { Skeleton } from 'antd';
import { useParams } from 'react-router-dom';

export default function ThreadPage() {
  const { threadId } = useParams();
  const { data: thread = null } = useThreadGet(Number(threadId));

  return (
    <Layout>
      {thread ? (
        <div className="text-center m-16 ml-32 mt-20 flex-1 items-center justify-center">
          <Thread
            nickname={thread.author.nickname}
            name={thread?.author.name}
            surname={thread?.author.surname}
            threadData={thread}
            commentsCount={thread.comments.length || 0}
            containerClassName="w-[80%]"
            titleClassName="text-xl"
            contentClassName="text-lg"
            userInfoClassName="text-xl"
          ></Thread>
          {/* <CommentCreateForm postId={thread.id}></CommentCreateForm> */}
          {/* {post.comments.map((comment) => (
            <Comment
              likes={comment.likes}
              postId={comment.}
              key={comment.text}
              author={comment.author}
              text={comment.text}
            />
          ))} */}
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
