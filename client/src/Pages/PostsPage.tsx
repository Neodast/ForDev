import Post from '@/components/Posts/Post/Post';
import Layout from '../components/Layouts/Layout';
import RightMenuBar from '@/components/Posts/RightMenuBar/RightMenuBar';
import { useMemo } from 'react';
import PostCreateForm from '@/components/Posts/Post/PostCreateForm';
import useGetAllPosts from '@/hooks/posts/useGetAllPosts';

export default function PostsPage() {
  const { data: posts = [] } = useGetAllPosts();

  const memoMain = useMemo(
    () => (
      <div className="text-center m-16 mt-20 flex-1 items-center justify-center">
        {posts.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            nickname={post.author.nickname}
            options={post}
          >
            <p>{post.text}</p>
          </Post>
        ))}
        <RightMenuBar
          filters={['Front', 'Back', 'Full']}
          actionTitle="New Post"
          form={<PostCreateForm></PostCreateForm>}
        ></RightMenuBar>
      </div>
    ),
    [posts],
  );

  return <Layout>{memoMain}</Layout>;
}
