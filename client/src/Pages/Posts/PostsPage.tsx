import Layout from '../../components/Layouts/Layout';
import RightMenuBar from '@/components/Posts/RightMenuBar/RightMenuBar';
import { useMemo } from 'react';
import PostCreateForm from '@/components/Posts/Post/PostCreateForm';
import usePostsGetAll from '@/hooks/posts/usePostsGetAll';
import Container from '@/components/Posts/Reusable/Container';
import { Skeleton } from 'antd';
import Post from '@/components/Posts/Post/Post';
import PostModel from '@/types/models/Post';

export default function PostsPage() {
  const { data: posts = Array(20).fill(null), isLoading } = usePostsGetAll();

  const memoMain = useMemo(
    () => (
      <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
        {!isLoading
          ? posts.map((post: PostModel) => (
              <Post
                key={post.id}
                name={post.author.name}
                surname={post.author.surname}
                nickname={post.author.nickname}
                postData={post}
                commentsCount={post.comments.length || 0}
                titleClassName="text-base"
                contentClassName="text-sm"
                userInfoClassName="text-base"
              ></Post>
            ))
          : posts.map(() => (
              <Container className="h-64" >
                <Skeleton avatar={true} />
              </Container>
            ))}
        <RightMenuBar
          filters={['Front', 'Back', 'Full']}
          actionTitle="New Post"
          form={<PostCreateForm></PostCreateForm>}
        ></RightMenuBar>
      </div>
    ),
    [posts, isLoading],
  );

  return <Layout>{memoMain}</Layout>;
}
